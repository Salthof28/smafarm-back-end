import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { RefreshPayload } from "../../global/type/refresh";
import { UsersRepositoryItf } from "../../users/users.repository.interface";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService, @Inject('UsersRepositoryItf') private usersRepository: UsersRepositoryItf){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET || 'nosecret',
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: RefreshPayload) {
        // const authHeader = req.headers['authorization'];
        // const refreshToken = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;

        // if (!refreshToken) {
        //     throw new UnauthorizedException('Refresh token not found in header');
        // }

        // return { ...payload, refreshToken };
        if(!payload) throw new UnauthorizedException('invalid token payload');
        const session = await this.usersRepository.findSessionbyIdToken(payload.id_token)
        if(!session) throw new UnauthorizedException('session not found, you logged out');
        return { id: payload.sub, id_token: payload.id_token, tokenAccess: payload.tokenAccess };
    }
}