import { SessionLogin, Users } from "@prisma/client";
import { CreateUserDto } from "../users/dto/req/create-user.dto";
import { LoginUserDto } from "./dto/req/login.dto";


export interface AuthServiceItf {
    register(body: CreateUserDto): Promise<Users>;
    login(body: LoginUserDto, dataReq: DataReq): Promise<{ access_token: string, refresh_token: string }>;
    refreshToken(id_token: string, oldAccessToken: string, oldRefreshToken: string): Promise<{ access_token: string, refresh_token: string }>;
    logout(id_token: string): Promise<SessionLogin>
}

export interface DataReq {
    userAgent: string,
    ipAddress: string
}