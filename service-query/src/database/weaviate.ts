import weaviate from "weaviate-ts-client";
import axios from "axios";

export const weaviateClient = weaviate.client({
  scheme: "http",
  host: process.env.WEAVIATE_HOST as string,
});

export async function findProductsByPrompt(name: string): Promise<any[]> {
  const EMBEDDING_HOST = process.env.EMBEDDING_HOST as string;

  try {
    const vectorized = await axios.post<{ embedding: number[] }>(
      `http://${EMBEDDING_HOST}`,
      {
        model: "nomic-embed-text",
        prompt: name,
      }
    );

    const vector = vectorized.data.embedding;

    if (!vector || !Array.isArray(vector)) {
      return [];
    }

    const scheme = `
      id_
      group_id
      media_group_id
      seller_id
      name
      sku
      price
      description
      category
      brand
      model
      bullet_list
      color
      condition_
      country
      origin
      city
      postal
      discount
      discount_value
      discount_percent
      created_at
      updated_at
        _additional {
      certainty
    }
    `;

    const response = await weaviateClient.graphql
      .get()
      .withClassName("ProductV1")
      .withFields(scheme)
      .withNearVector({
        vector,
        certainty: 0.7,
      })
      .withWhere({
        operator: "And",
        operands: [
          //{ path: ["category"], operator: "Equal", valueText: "Electronics" },
          //{ path: ["discount"], operator: "Equal", valueBoolean: true },
          { path: ["price"], operator: "GreaterThan", valueInt: 10 },
        ],
      })
      .withLimit(10)
      .do();

    const products = response.data?.Get?.ProductV1 || [];

    if (products.length === 0) {
      return [];
    }

    const transformedArray = products.map((item: any) => {
      const { _additional, id_, ...rest } = item;
      return {
        ...rest,
        id: id_,
      };
    });

    return transformedArray;
  } catch (error: any) {
    return [];
  }
}
