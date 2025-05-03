import { Request, Response, NextFunction } from "express";
export declare const sellerRequired: (req: Request, res: Response, next: NextFunction) => void;
export declare const sellerRequiredGraphQL: (req: Request, res: Response, next: NextFunction) => void;
