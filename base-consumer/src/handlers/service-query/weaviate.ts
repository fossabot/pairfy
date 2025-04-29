import weaviate from "weaviate-ts-client";
import axiosRetry from "axios-retry";
import axios from "axios";
import { logger } from "@pairfy/common";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export const weaviateClient = weaviate.client({
  scheme: "http",
  host: process.env.HANDLER_WEAVIATE_HOST as string,
});

export async function createProductIndex(product: any): Promise<boolean> {
  try {
    const productDescription = JSON.stringify(product.description);

    const { data } = await axios.post<{ embedding: number[] }>(
      `http://${process.env.HANDLER_EMBEDDINGS_HOST as string}/api/embeddings`,
      {
        model: "nomic-embed-text",
        prompt: `${product.name} ${product.category} ${productDescription}`,
      }
    );

    if (!Array.isArray(data.embedding)) {
      logger.error("❌ Embedding generation failed.");
      return false;
    }

    await weaviateClient.data
      .creator()
      .withClassName("ProductV1")
      .withProperties({
        ...product,
        id_: product.id,
        description: productDescription,
      })
      .withVector(data.embedding)
      .do();

    console.log("✅ Product created successfully.");
    return true;
  } catch (error) {
    logger.error(`❌ Error creating product: ${error}`);
    return false;
  }
}
