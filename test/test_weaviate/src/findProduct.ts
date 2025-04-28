import weaviate from "weaviate-ts-client";

export async function findProduct(sku: string): Promise<any | null> {
  const WEAVIATE_HOST = process.env.WEAVIATE_HOST || "localhost:8080";

  console.log("🔍 Searching product with SKU:", sku);

  const client = weaviate.client({
    scheme: "http",
    host: WEAVIATE_HOST,
  });

  try {
    const response = await client.graphql
      .get()
      .withClassName("ProductV1")
      .withFields(`
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
      `)
      .withWhere({
        path: ["sku"],
        operator: "Equal",
        valueText: sku,
      })
      .do();

    const products = response.data?.Get?.ProductV1 || [];

    if (products.length === 0) {
      console.log("⚠️ No product found with that SKU.");
      return null;
    }

    console.log("✅ Product found:", products[0]);
    return products[0];
  } catch (error: any) {
    console.error("❌ Error searching for product:", error.response?.data || error.message || error);
    throw error;
  }
}


const main = async () => {
    try {
      const sku = "SKU-001"; 
      const product = await findProduct(sku);
  
      if (!product) {
        console.log("No product found.");
      } 
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  main();
  