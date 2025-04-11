import { verifySellerValidator } from "../validators/verify-seller";

import { ApiError, asyncHandler, ERROR_CODES } from "../common/errorHandler";

const verifySellerMiddlewares: any = [];

const verifySellerHandler = asyncHandler(async (req, res) => {
  const { token } = verifySellerValidator.parse(req.body);

  console.log(token);

  const isValid = true;

  if (!isValid) {
    throw new ApiError(401, "token authentication error", {
      code: ERROR_CODES.INVALID_SIGNATURE,
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      message: "Token verified successfully",
    },
  });
});

export { verifySellerMiddlewares, verifySellerHandler };
