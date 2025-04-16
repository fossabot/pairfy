export declare function createToken(params: object, expires?: string): string;
/**Verifies JWT token, raises TokenExpiredError, NotBeforeError, JsonWebTokenError */
export declare function verifyToken(token: string, key: string): any;
