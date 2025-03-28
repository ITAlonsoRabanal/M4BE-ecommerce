import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

function validateRequest(request, jwtService) {
    const token = request.headers[`authorization`]?.split(' ')[1];
    
    if(!token){
        throw new UnauthorizedException(`Falta el token`)
    }
    try {
        const secret = process.env.JWT_SECRET;
        const payload = jwtService.verify(token, {secret} );
        payload.iat = new Date(payload.iat *1000)
        payload.exp = new Date(payload.exp *1000)
        request.user = payload;
        return true
    } catch (error) {
        throw new UnauthorizedException(`Invalid Token`)
    }
    }

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // Le pasamos la validacion del token
        return validateRequest(request, this.jwtService);
    }
}