import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'AuthServiceItf', useClass: AuthService },
  ],
})
export class AuthModule {}
