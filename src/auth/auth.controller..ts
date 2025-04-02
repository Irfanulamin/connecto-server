import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { authService } from "./auth.service";

interface Iauth {
  username: string;
  email: string;
  password: string;
}

class CreateAuthDto {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private authService: authService) {}

  @Post("/register")
  async create(@Body() createAuthDto: CreateAuthDto) {
    try {
      return this.authService.register(createAuthDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Post("/login")
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      return await this.authService.login(createAuthDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Get()
  async findAll(): Promise<Iauth[]> {
    return this.authService.findAll();
  }
}
