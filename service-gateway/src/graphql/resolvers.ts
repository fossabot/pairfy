import { getProductId, logger } from "../utils/index.js";
import { database } from "../db/client.js";

const getOrders = async (args: any, context: any) => {
    const params = args.updateProductInput;

    console.log(params);

    const SELLER = context.sellerData;

    let connection = null;

    try {
        connection = await database.client.getConnection();

        await connection.beginTransaction();

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
        getOrders: (_: any, args: any, context: any) => getOrders(args, context)
    },
};


export { products }