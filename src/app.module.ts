import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';
import { CategoryModule } from './category/category.module';
import { FarmsModule } from './farms/farms.module';
import { SheltersModule } from './shelters/shelters.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UploadsModule,
    CategoryModule,
    FarmsModule,
    SheltersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
