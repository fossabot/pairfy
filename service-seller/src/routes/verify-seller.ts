import { verifySellerValidator } from "../validators/verify-seller";
import { asyncHandler } from "../common";

const verifySellerMiddlewares: any = [];

const verifySellerHandler = asyncHandler(async (req, res) => {

  const { token } = verifySellerValidator.parse(req.body);

  const isValid = token === "123456";

  if (!isValid) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  return res.status(200).json({
    data: {
      message: "Token verified successfully",
      sellerId: 42,
    },
  });


});

export { verifySellerMiddlewares, verifySellerHandler };
