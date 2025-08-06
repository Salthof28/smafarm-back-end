import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { AccessPayload } from "../type/auth";
import { UsersRepositoryItf } from "src/users/users.repository.interface";
// import { config } from 'dotenv'
// config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(@Inject('UsersRepositoryItf') private usersRepository: UsersRepositoryItf, private configService: ConfigService, ) {
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'nosecret'
        })
    }

    async validate(payload: AccessPayload) {
        // console.log('JWT Payload:', payload);
        const session = await this.usersRepository.findSessionbyIdToken(payload.id_token)
        if(!session) throw new UnauthorizedException('session not found, you logged out');
        return { id: payload.sub, id_token: payload.id_token, name: payload.name, role: payload.role, expires_at: payload.expires_at };
    }
}