import { SessionLogin, Users } from "@prisma/client";
import { CreateUserDto } from "src/users/dto/req/create-user.dto";
import { LoginUserDto } from "./dto/login.dto";
import { SessionDetailDto } from "src/users/dto/req/create-session-login.dto";


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