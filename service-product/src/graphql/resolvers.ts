import { getProductId, logger } from "../utils/index.js";
import { database } from "../db/client.js";


const createProduct = async (args: any, context: any) => {
    const params = args.createProductInput;

    console.log(params);

    const SELLER = context.sellerData;

    if (params.collateral >= params.price) {
        throw new Error("MAX_COLLATERAL");
    }

    let connection = null;

    try {
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
            image_path,
            video_path,
            image_set,
            video_set,
            schema_v
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const schemeValue = [
            "P" + getProductId(),
            SELLER.id,
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
            SELLER.country,
            "https://pairfy.dev",
            "/api/media/get-image/",
            "/api/media/get-video/",
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

        throw new Error('INTERNAL_ERROR');
    } finally {
        connection.release();
    }
};


const getProducts = async (args: any, context: any) => {
    const params = args.getProductsInput;

    const SELLER = context.sellerData;

    let connection = null;

    const pageSize = 5;

    console.log(params);

    let query = 'SELECT * FROM products WHERE seller_id = ?';

    let queryParams: any = [SELLER.id];

    if (params.cursor !== "NOT") {
        query += ' AND created_at < ?';

        const date = new Date(parseInt(params.cursor)).toISOString();

        queryParams.push(date);
    }

    query += ' ORDER BY created_at DESC LIMIT ?';

    queryParams.push(pageSize);

    console.log(query);

    try {
        connection = await database.client.getConnection();

        const [products] = await connection.query(query, queryParams);

        const cursor = products[products.length - 1].created_at;

        await connection.commit();

        return {
            products,
            cursor
        }

    } catch (err) {
        await connection.rollback();

        logger.error(err);

        return []
    } finally {
        connection.release();
    }
};

const products = {
    Query: {
        getProducts: (_: any, args: any, context: any) => getProducts(args, context)
    },
    Mutation: {
        createProduct: (_: any, args: any, context: any) => createProduct(args, context)
    },
};


export { products }