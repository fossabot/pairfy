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
    must.push({ match: { sku: query.sku } });
  }

  if (query.brand.enabled) {
    must.push({ match: { brand: query.brand } });
  }

  if (query.model.enabled) {
    must.push({ match: { model: query.model } });
  }

  const filter: any = [];

  if (query.price.enabled) {
    filter.push({
      range: {
        price: { gte: query.price.gte, lte: query.price.lte },
      },
    });
  }
  if (query.quality.enabled) {
    filter.push({ term: { quality: query.quality } });
  }

  if (query.discount.enabled) {
    filter.push({ term: { discount: query.discount } });
  }

  if (query.best_seller.enabled) {
    filter.push({ term: { best_seller: query.best_seller } });
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

    const query = {
      text: "samsung",
      sku: {
        enabled: true,
        value: "6552953",
      },
      brand: {
        enabled: false,
        value: "samsung",
      },
      model: {
        enabled: false,
        value: "SP-LFF3CLAXXZA",
      },
      quality: {
        enabled: false,
        value: "new",
      },
      discount: {
        enabled: false,
        value: false,
      },
      best_seller: {
        enabled: false,
        value: false,
      },
      price: {
        enabled: false,
        value: {
          gte: 100,
          lte: 700,
        },
      },
      sort: {
        price: "asc",
        rating: "desc",
        reviews: "desc",
        discount_value: "desc",
      },
    };

    const search = await searchIndex(query);

    console.log(search);

    const scheme = {
      success: true,
      payload: "test",
    };
    return scheme;
  } catch (err: any) {
    logger.error(err);
  }
};

export { searchProduct };
