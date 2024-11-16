import { getProductId, logger } from "../utils/index.js";
import { database } from "../db/client.js";

const updateProduct = async (args: any, context: any) => {
    const params = args.updateProductInput;

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
        UPDATE products
        SET name = ?,
            price = ?,  
            collateral = ?,
            sku = ?,              
            model = ?,
            brand = ?,
            features = ?,
            category = ?,
            keywords = ?,
            stock = ?,
            color = ?,
            color_name = ?,
            quality = ?,
            image_set = ?,
            video_set = ?,
            discount = ?,
            discount_value = ?,
            schema_v = schema_v + 1
        WHERE id = ? AND seller_id = ?
       `;

        const schemeValue = [
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
            params.image_set,
            params.video_set,
            params.discount,
            params.discount_value,
            params.id,
            SELLER.id
        ];

        const [result] = await connection.execute(schemeData, schemeValue);

        if (result.affectedRows !== 1) {
            throw new Error('INTERNAL_ERROR');
        }

        await connection.commit();

        return { success: true }

    } catch (err: any) {
        await connection.rollback();

        throw new Error(err.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

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
            discount,
            discount_value,
            schema_v
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
            params.discount,
            params.discount_value,
            0,
        ];

        await connection.execute(schemeData, schemeValue);

        await connection.commit();

        return { success: true }

    } catch (err: any) {
        await connection.rollback();

        throw new Error(err.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};


const getProducts = async (args: any, context: any) => {
    const params = args.getProductsInput;

    const SELLER = context.sellerData;

    let connection = null;

    const pageSize = 16;

    let query = 'SELECT * FROM products WHERE seller_id = ?';

    let queryParams: any = [SELLER.id];

    if (params.cursor !== 'NOT') {

        query += ' AND created_at < ?';

        const date = new Date(parseInt(params.cursor)).toISOString();

        queryParams.push(date);
    }

    query += ' ORDER BY created_at DESC LIMIT ?';

    queryParams.push(pageSize);

    try {
        connection = await database.client.getConnection();

        const [products] = await connection.query(query, queryParams);

        const [count] = await connection.execute(`SELECT COUNT(*) AS total_products FROM products WHERE seller_id = ?`, [SELLER.id]);

        const cursor = products.length ? products[products.length - 1].created_at : params.cursor;

        await connection.commit();

        return {
            products,
            cursor,
            count: count[0].total_products
        }

    } catch (err: any) {
        await connection.rollback();

        throw new Error(err.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};



const getProduct = async (args: any, context: any) => {
    const params = args.getProductInput;

    console.log(params);

    const SELLER = context.sellerData;

    let connection = null;

    try {
        connection = await database.client.getConnection();

        const [product] = await connection.execute(`SELECT * FROM products WHERE id = ? AND seller_id = ?`, [params.id, SELLER.id]);

        await connection.commit();

        if (!product.length) {
            throw new Error('NOT_PRODUCT');
        }

        return product[0]

    } catch (err: any) {
        await connection.rollback();

        throw new Error(err.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};



const deleteProduct = async (args: any, context: any) => {
    const params = args.deleteProductInput;

    console.log(params);

    const SELLER = context.sellerData;

    let connection = null;

    try {
        connection = await database.client.getConnection();

        await connection.beginTransaction();

        const schemeData = "DELETE FROM products WHERE id = ? AND seller_id = ?";

        const schemeValue = [params.id, SELLER.id];

        const [result] = await connection.execute(schemeData, schemeValue);

        if (result.affectedRows !== 1) {
            throw new Error('INTERNAL_ERROR');
        }

        await connection.commit();

        return { success: true }

    } catch (err: any) {
        await connection.rollback();

        throw new Error(err.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};



const products = {
    Query: {
        getProducts: (_: any, args: any, context: any) => getProducts(args, context),
        getProduct: (_: any, args: any, context: any) => getProduct(args, context)
    },
    Mutation: {
        createProduct: (_: any, args: any, context: any) => createProduct(args, context),
        updateProduct: (_: any, args: any, context: any) => updateProduct(args, context),
        deleteProduct: (_: any, args: any, context: any) => deleteProduct(args, context)
    },
};


export { products }