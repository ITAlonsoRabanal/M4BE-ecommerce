import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


function validateFields (request) {
    
    const authHeader = request.headers.authorization;

    const authRegex = /^Basic: ([^:]+):(.+)$/;

    if (!authHeader) {
        throw new UnauthorizedException("Authorization header is missing");
    }

    const match = authHeader.match(authRegex);

    if (!match) {
        throw new UnauthorizedException("Invalid Authorization format. Expected: Basic: <email>:<password>");
    }

    const [, email, password] = match;

    // Validaciones básicas (opcional)
    if (!email || !password) {
        throw new UnauthorizedException("Email or password missing in Authorization header");
    }
    return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return validateFields(request)
        
    }
}