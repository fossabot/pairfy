import weaviate from "weaviate-ts-client"; 

(async () => {
  const HOST = "localhost:8080";

  const client = weaviate.client({
    scheme: "http",
    host: HOST,
  });

  const product = {
    group_id: "group-123",
    state: "active",
    moderated: false,
    seller_id: "seller-456",
    thumbnail_url: "https://example.com/image.png",
    name: "Wireless Headphones",
    price: 199,
    sku: "WH-2025",
    model: "WH-XB900",
    brand: "Sony",
    description: "Wireless Noise Cancelling Over-Ear Headphones.",
    category: "Electronics",
    bullet_list: ["Bluetooth 5.0", "30 Hours Battery", "Quick Charge"],
    color: "Black",
    condition: "new",
    country: "USA",
    origin: "Japan",
    city: "San Francisco",
    postal: "94105",
    discount: true,
    discount_value: 20,
    created_at: Date.now(),
    updated_at: Date.now(),
    schema_v: 1,
  };

  try {
    const response = await client.data
      .creator()
      .withClassName("ProductV1")
      .withProperties(product)
      .do();

    const productId = response.id;

    console.log("✅ Product created:", response);
  } catch (error) {
    console.error("❌ Error creating product:", error);
  }
})();
