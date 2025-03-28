import database from "../database";
import { Request, Response } from "express";
import { adminMiddleWare } from "../utils/admin";
import { adminRequired } from "../utils/admin-required";
import { logger } from "../utils";


const deleteUserMiddlewares: any = [adminMiddleWare, adminRequired];

const deleteUserHandler = async (req: Request, res: Response) => {
    let connection = null;
    let params = req.body;

    try {
        connection = await database.client.getConnection();

        await connection.beginTransaction();

        const schemeData = 'DELETE FROM users WHERE pubkeyhash = ?';

        const schemeValue = [
            params.user_id,
        ];

        await connection.execute(schemeData, schemeValue);

        await connection.commit();

        res.status(200).send({ success: true });
    } catch (err) {
        logger.error(err);

        if (connection){
            await connection.rollback();
        }

        res.status(404).send({ success: false });
    } finally {
        if(connection){
            connection.release();
        }
    }
};

export { deleteUserHandler, deleteUserMiddlewares };
