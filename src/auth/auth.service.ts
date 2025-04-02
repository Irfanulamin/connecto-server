import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./typeorm/entities/user";
import jwt from "jsonwebtoken";
import "dotenv/config";

@Injectable()
export class authService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async register(user: User): Promise<string> {
    const existingUser = await this.authRepository.findOne({
      where: [{ email: user.email }, { username: user.username }],
    });

    if (existingUser) {
      return "Username or email must be unique";
    }

    const savedUser = await this.authRepository.save(user);

    const token = jwt.sign(
      {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
      },
      process?.env?.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return JSON.stringify({
      success: true,
      message: "Registration successful",
      token,
    });
  }

  async login(user: User | null): Promise<string> {
    const foundUser = await this.authRepository.findOne({
      where: { email: user?.email },
    });

    if (!foundUser || foundUser.password !== user?.password) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
      },
      process?.env?.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return JSON.stringify({
      success: true,
      message: "Login successful",
      token,
    });
  }

  findAll(): Promise<User[]> {
    return this.authRepository.find();
  }
}
