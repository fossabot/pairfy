import { getProductId, logger } from "../utils/index.js";
import { database } from "../db/client.js";


const createProduct = async (args: any, context: any) => {
    const params = args.createProductInput;

    const SELLER = "";

    let connection = null;

    try {
        if (params.collateral >= params.price) {
            throw new Error("MAX_COLLATERAL");
        }

        connection = await database.client.getConnection();

        await connection.beginTransaction();

        const schemeData = `
      INSERT INTO products (
        id,
        seller_id,
        name,
        price,  
        collateral,
        sku,              
        model,
        brand,
        features,
        category,
        keywords,
        stock,
        color,
        color_name,
        quality,
        country,
        media_url,
        media_path,
        image_set,
        video_set,
        schema_v
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const schemeValue = [
            "P" + getProductId(),
            "seller_id",
            params.name,
            params.price,
            params.collateral,
            params.sku,
            params.model,
            params.brand,
            params.features,
            params.category,
            params.keywords,
            params.stock,
            params.color,
            params.color_name,
            params.quality,
            "country",
            "https://pairfy.dev",
            "/api/media/get-image/",
            params.image_set,
            params.video_set,
            0,
        ];

        await connection.execute(schemeData, schemeValue);

        await connection.commit();

        return { success: true }

    } catch (err) {
        await connection.rollback();

        logger.error(err);
    } finally {
        connection.release();
    }
};


const products = {
    Mutation: {
        createProduct: (_: any, args: any, context: any) => createProduct(args, context)
    },
};


export { products }