import { SellerToken } from "../sellerAuth";

declare global {
    namespace Express {
      interface Request {
        publicAddress?: string;
        sellerData?: SellerToken;
        session?: {
          jwt?: string;
          [key: string]: any;
        } | null | undefined;
      }
    }
  }
