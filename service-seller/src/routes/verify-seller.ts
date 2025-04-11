import { ApiError, asyncHandler, ERROR_CODES } from "../common/errorHandler";
import { verifySellerValidator } from "../validators/verify-seller";
import { verifyToken } from "../utils/token";

const verifySellerMiddlewares: any = [];

const verifySellerHandler = asyncHandler(async (req, res) => {
  const { token } = verifySellerValidator.parse(req.body);

  console.log(token);

  const sellerData = verifyToken(token, process.env.AGENT_JWT_KEY as string);

  console.log(sellerData);

  

  return res.status(200).json({
    success: true,
    data: {
      message: "Token verified successfully",
    },
  });
});

export { verifySellerMiddlewares, verifySellerHandler };
