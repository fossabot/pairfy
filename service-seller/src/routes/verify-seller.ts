import { ApiError, asyncHandler, ERROR_CODES } from "../common/errorHandler";
import { verifySellerValidator } from "../validators/verify-seller";
import { verifyToken } from "../utils/token";
import { updateSeller } from "./updateSeller";
import { getSellerByEmail } from "./getSeller";
import DB from "../database";

const verifySellerMiddlewares: any = [];

const verifySellerHandler = asyncHandler(async (req, res) => {
  const { token } = verifySellerValidator.parse(req.body);

  const sellerToken = verifyToken(token, process.env.AGENT_JWT_KEY as string);

  const connection = await DB.client.getConnection();

  await connection.beginTransaction();

  if (sellerToken.entity === "SELLER") {
    const sellerData = await getSellerByEmail(connection, sellerToken.email);

    console.log(sellerData)

    await updateSeller(connection, sellerData.id, sellerData.schema_v, {
      verified: true,
    });
  }

  await connection.commit();

  connection.release();

  return res.status(200).json({
    success: true,
    data: {
      message: "Token verified successfully",
    },
  });
});

export { verifySellerMiddlewares, verifySellerHandler };
