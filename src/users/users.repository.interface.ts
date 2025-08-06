import { SessionLogin, Users } from "@prisma/client";
import { CreateUserDto } from "./dto/req/create-user.dto";
import { Condition } from "src/global/entities/condition-entity";
import { SessionDetailDto } from "./dto/req/create-session-login.dto";
import { UpdateRefreshTokenSessionDto } from "./dto/req/update-refresh-token-session.dto";

export interface UsersRepositoryItf {
    findEmail(email: string): Promise<Users | undefined>;
    findById(id: number): Promise<(Users & { sessions: SessionLogin[] }) | undefined>;
    findExistingUser(condition: Condition[]): Promise<Users | undefined>;
    created(body: CreateUserDto): Promise<Users>;
    loginSession(session: SessionDetailDto): Promise<SessionLogin>;
    findSessionbyUserId(user_id: number): Promise<SessionLogin[] | undefined>;
    updateRefreshToken(newRefreshToken: UpdateRefreshTokenSessionDto): Promise<SessionLogin>;
    deleteSession(id: string): Promise<SessionLogin>;
}



