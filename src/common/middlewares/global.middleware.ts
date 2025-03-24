import { NextFunction, Request, Response } from "express";

export function globalMiddleware(req: Request, res: Response, next: NextFunction) {
    const date = Date().toString();
    console.log(`${date} Middleware GLOBAL: ~ Estas ejecutando un metodo ${req.method} en la ruta ${req.originalUrl}`);
    next();
}