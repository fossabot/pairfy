import { Client } from "@elastic/elasticsearch";
import { logger } from "../../utils/index.js";

const searchClient = new Client({
  node: process.env.ELASTIC_ENDPOINT as string,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY as string,
  },
});

const processQueryParams = (query: any): any => {
  const must: any = [
    {
      multi_match: {
        query: query.text,
        fields: ["name^3", "category^2", "keywords"],
        type: "best_fields",
      },
    },
  ];

  if (query.sku.enabled) {
    must.push({ match: { sku: query.sku.value } });
  }

  if (query.brand.enabled) {
    must.push({ match: { brand: query.brand.value } });
  }

  if (query.model.enabled) {
    must.push({ match: { model: query.model.value } });
  }

  const filter: any = [];

  if (query.price.enabled) {
    filter.push({
      range: {
        price: { gte: query.price.value.gte, lte: query.price.value.lte },
      },
    });
  }
  if (query.quality.enabled) {
    filter.push({ term: { quality: query.quality.value } });
  }

  if (query.discount.enabled) {
    filter.push({ term: { discount: query.discount.value } });
  }

  if (query.best_seller.enabled) {
    filter.push({ term: { best_seller: query.best_seller.value } });
  }

  const body = {
    query: {
      bool: {
        must,
        filter,
      },
    },
    sort: [
      { price: query.sort.price },
      { rating: query.sort.rating },
      { reviews: query.sort.reviews },
      { discount_value: query.sort.discount_value },
    ],
    size: 30,
  };

  return body;
};

const searchIndex = async (query: any) => {
  let result: any = [];

  try {
    const response = await searchClient.search({
      index: "products",
      body: processQueryParams(query),
    });

    console.log(response);

    result = response.hits.hits;
  } catch (err) {
    logger.error(err);
  } finally {
    return result;
  }
};

const searchProduct = async (_: any, args: any, context: any) => {
  try {
    const params = args.searchProductInput;

    const search = await searchIndex(params);

    console.log(search);

    return search;
  } catch (err: any) {
    logger.error(err);
  }
};

export { searchProduct };
