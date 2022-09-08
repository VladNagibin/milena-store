import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class ProductMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers
        try {
            let tokenValue = jwt.verify(authorization, process.env.JWT_TOKEN)
            if (tokenValue == process.env.ADMIN_TOKEN_VALUE) {
                next();
            } else {
                res.status(401).json({
                    success: false,
                    err: 'invalid token'
                })
            }
        } catch (e) {
            res.status(401).json({
                success: false,
                err: 'invalid token'
            })
        }

    }
}
