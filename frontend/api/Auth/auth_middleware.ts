import jwt from "jsonwebtoken";
import "dotenv/config";

import { Request, Response, NextFunction } from "express";

const secret_key: string = String(process.env.SECRET_KEY);
const exceptions = ["/", "/login", "/registerUser"];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (exceptions.includes(req.path)) return next();
    const headerToken = req.headers["authorization"];
    const token: string = (headerToken?.split(" ")[1] as any);

    if (!token) {
        res.status(401).json({ message: `Acess diened for this user!` });
        return;
    }
    try {
        const payload = jwt.verify(token, secret_key);
        payload ? (req as any).user == payload : res.status(401).json({ message: `Acess diened for this user!` });
        next();
    }
    catch (error) {
        res.status(401).json({ message: `Acess diened: Invalid token !` })
    }
}
