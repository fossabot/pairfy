import weaviate from 'weaviate-ts-client';

(async () => {
  const HOST = process.env.WEAVIATE_HOST || "localhost:8080";

  console.log("Weaviate Host:", HOST);

  const client = weaviate.client({
    scheme: "http",
    host: HOST,
  });

  const className = "ProductV1";

  try {
    const schema = await client.schema.getter().do();
    const classExists = schema.classes?.some(c => c.class === className);

    if (!classExists) {
      console.log(`ℹ️ Class '${className}' does not exist. No action needed.`);
      return;
    }

    await client.schema.classDeleter().withClassName(className).do();
    console.log(`✅ Class '${className}' deleted successfully.`);
  } catch (error: any) {
    console.error(`❌ Error deleting class '${className}':`, error.message);
    throw error;
  }
})();
