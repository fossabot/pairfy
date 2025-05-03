import weaviate from "weaviate-ts-client";
import axios from "axios";

export async function createProduct(productData: any): Promise<void> {
  const WEAVIATE_HOST = process.env.WEAVIATE_HOST || "localhost:8080";
  const OLLAMA_HOST = process.env.OLLAMA_HOST || "localhost:11434";

  console.log("Connecting to Weaviate:", WEAVIATE_HOST);
  console.log("Connecting to Ollama:", OLLAMA_HOST);

  const client = weaviate.client({
    scheme: "http",
    host: WEAVIATE_HOST,
  });

  try {
    if (!productData.id_) {
      throw new Error("❌ Missing 'id_' field in productData. Cannot create product without a business id.");
    }

    const textToEmbed = `${productData.name} ${JSON.stringify(
      productData.description
    )} ${productData.category}`;

    const embeddingResponse = await axios.post<{ embedding: number[] }>(
      `http://${OLLAMA_HOST}/api/embeddings`,
      {
        model: "nomic-embed-text",
        prompt: textToEmbed,
      }
    );

    const vector = embeddingResponse.data.embedding;

    if (!vector || !Array.isArray(vector)) {
      throw new Error("❌ Failed to generate embedding from Ollama.");
    }

    await client.data
      .creator()
      .withClassName("ProductV1")
      .withProperties({
        id_: productData.id_,
        group_id: productData.group_id,
        state: productData.state || "created",
        moderated: productData.moderated ?? false,
        seller_id: productData.seller_id,
        thumbnail_url: productData.thumbnail_url,
        name: productData.name,
        price: productData.price,
        sku: productData.sku,
        model: productData.model,
        brand: productData.brand,
        description: JSON.stringify(productData.description),
        category: productData.category,
        bullet_list: productData.bullet_list,
        color: productData.color,
        condition_: productData.condition_,
        country: productData.country,
        origin: productData.origin,
        city: productData.city,
        postal: productData.postal,
        discount: productData.discount,
        discount_value: productData.discount_value,
        created_at: productData.created_at || Date.now(),
        updated_at: productData.updated_at || Date.now(),
        schema_v: productData.schema_v || 1,
      })
      .withVector(vector)
      .do();

    console.log("✅ Product created successfully in Weaviate.");
  } catch (error: any) {
    console.error("❌ Error creating product:", error.message);
    throw error;
  }
}


const product: any = {
  id_: "product-002", 
  group_id: "group-001",
  seller_id: "seller-abc",
  thumbnail_url: "https://example.com/product.jpg",
  name: "Wireless Bluetooth Headphones",
  price: 199,
  sku: "SKU-001",
  model: "WH-1000XM5",
  brand: "Sony",
  description: { type: "doc", content: [] },
  category: "Electronics",
  bullet_list: ["Bluetooth 5.0", "Noise Cancelling", "30h Battery"],
  color: "Black",
  condition_: "New",
  country: "JP",
  origin: "JP",
  city: "Tokyo",
  postal: "100-0001",
  discount: true,
  discount_value: 20,
};

const main = async () => {
  await createProduct(product);
};

main();