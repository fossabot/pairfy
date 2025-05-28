import weaviate from "weaviate-ts-client";
import axios from "axios";

const WEAVIATE_HOST = process.env.WEAVIATE_HOST as string;
const EMBEDDING_HOST = process.env.EMBEDDING_HOST as string;

export const weaviateClient = weaviate.client({
  scheme: "http",
  host: WEAVIATE_HOST,
});

const FIELDS = `
  id_
  group_id
  seller_id
  thumbnail_url
  name
  sku
  price
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

  _additional {
    certainty
  }
`;

type Condition = "new" | "used" | "refurbished";

interface ProductSearchFilters {
  sku?: string;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  brand?: string;
  model?: string;
  condition?: Condition;
  discountPercentMin?: number;
}

export async function findProductsByPrompt(
  prompt: string,
  vectorized: boolean,
  filters: ProductSearchFilters = {}
): Promise<any[]> {
  const operands: any[] = [];

  if (filters.sku) {
    operands.push({ path: ["sku"], operator: "Equal", valueText: filters.sku });
  }
  if (filters.priceMin !== undefined) {
    operands.push({ path: ["price"], operator: "GreaterThanEqual", valueInt: filters.priceMin });
  }
  if (filters.priceMax !== undefined) {
    operands.push({ path: ["price"], operator: "LessThanEqual", valueInt: filters.priceMax });
  }
  if (filters.category) {
    operands.push({ path: ["category"], operator: "Equal", valueText: filters.category });
  }
  if (filters.brand) {
    operands.push({ path: ["brand"], operator: "Equal", valueText: filters.brand });
  }
  if (filters.model) {
    operands.push({ path: ["model"], operator: "Equal", valueText: filters.model });
  }
  if (filters.condition) {
    operands.push({ path: ["condition_"], operator: "Equal", valueText: filters.condition });
  }
  if (filters.discountPercentMin !== undefined) {
    operands.push({ path: ["discount_percent"], operator: "GreaterThanEqual", valueInt: filters.discountPercentMin });
  }

  if (!prompt.trim()) return [];

  try {
    const query = weaviateClient.graphql
      .get()
      .withClassName("ProductV1")
      .withFields(FIELDS)
      .withLimit(100);

    if (operands.length > 0) {
      query.withWhere({ operator: "And", operands });
    }

    if (vectorized) {
      console.log("VECTORIZED SEARCH", prompt)

      const { data } = await axios.post<{ embedding: number[] }>(
        `http://${EMBEDDING_HOST}`,
        { model: "nomic-embed-text", prompt }
      );

      const vector = data.embedding;
      if (!Array.isArray(vector) || vector.length === 0) return [];

      query.withNearVector({ vector, certainty: 0.7 });
    } else {
      console.log("CLASSIC SEARCH", prompt)

      query.withBm25({
        query: prompt,
        properties: ["name", "sku", "brand", "category", "model"],
      });
    }

    const result = await query.do();
    const products = result.data?.Get?.ProductV1 || [];

    return products.map(({ _additional, id_, ...rest }: any) => ({
      ...rest,
      id: id_,
    }));
  } catch (error: any) {
    console.error("Error in findProductsByPrompt:", error.message || error);
    return [];
  }
}
