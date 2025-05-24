import weaviate from "weaviate-ts-client";
import axios from "axios";

export async function findProductByVector(name: string): Promise<any[] | null> {
  const WEAVIATE_HOST = process.env.WEAVIATE_HOST || "localhost:8080";
  const OLLAMA_HOST = process.env.OLLAMA_HOST || "localhost:11434";

  console.log("🔍 Searching product(s) by vector similarity for name:", name);

  const client = weaviate.client({
    scheme: "http",
    host: WEAVIATE_HOST,
  });

  try {
    // Paso 1: obtener el vector del nombre usando Ollama
    const embeddingResponse = await axios.post<{ embedding: number[] }>(
      `http://${OLLAMA_HOST}/api/embeddings`,
      {
        model: "nomic-embed-text",
        prompt: name,
      }
    );

    const vector = embeddingResponse.data.embedding;

    if (!vector || !Array.isArray(vector)) {
      throw new Error("❌ Failed to generate embedding from Ollama.");
    }

    // Paso 2: buscar en Weaviate usando nearVector
    const response = await client.graphql
      .get()
      .withClassName("ProductV1")
      .withFields(
        `
        id_
        group_id
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
        created_at
        updated_at
        _additional {
          certainty
        }
      `
      )
      .withNearVector({
        vector,
        certainty: 0.7,
      })
      .withWhere({
        operator: "And",
        operands: [
          //{ path: ["category"], operator: "Equal", valueText: "Electronics" }, 
          //{ path: ["discount"], operator: "Equal", valueBoolean: true },         
          { path: ["price"], operator: "GreaterThan", valueInt: 10 }           
        ]
      })
      .withLimit(10)
      .do();

    const products = response.data?.Get?.ProductV1 || [];

    if (products.length === 0) {
      console.log("⚠️ No products found by vector search.");
      return null;
    }

    console.log(`✅ ${products.length} product(s) found by vector.`);
    return products;
  } catch (error: any) {
    console.error(
      "❌ Error searching for product by vector:",
      error.response?.data || error.message || error
    );
    throw error;
  }
}

// 🔥 Ejemplo de uso:
const main = async () => {
  try {
    const name = "razer";
    const products = await findProductByVector(name);

    if (!products) {
      console.log("No products found.");
    } else {
      console.log(products);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
