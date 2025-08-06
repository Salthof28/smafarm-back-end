import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { AccessPayload } from "../type/auth";
// import { config } from 'dotenv'
// config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(private configService: ConfigService) {
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'nosecret'
        })
    }

    async validate(payload: AccessPayload) {
        // console.log('JWT Payload:', payload);
        if(!payload) throw new UnauthorizedException('invalid token payload');
        return { id: payload.sub, name: payload.name, role: payload.role, expires_at: payload.expires_at };
    }
}