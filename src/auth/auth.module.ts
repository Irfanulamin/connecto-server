import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller.";
import { authService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./typeorm/entities/user";

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [authService],
  exports: [authService],
})
export class AuthModule {}
