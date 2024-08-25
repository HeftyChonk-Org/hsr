import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import { RegisterFormData } from "@/api/ApiInterface";
import {
  ApiResponse,
  ApiSuccessResponse,
} from "@/api/utils/response/apiResponse";
import { RegisterError } from "@/api/utils/response/registerError";
import { Logger } from "@/logger";

export async function registerUser(
  registerData: RegisterFormData
): Promise<ApiSuccessResponse | RegisterError> {
  const response = new ApiResponse();
  const prisma = new PrismaClient();
  const redisClient = await createClient({
    password: process.env.REDIS_PASSWORD,
  }).connect();
  const email: string = registerData.email;
  const password: string = registerData.password;
  const hashedPassword: string = await argon2.hash(password, {
    type: argon2.argon2id,
    parallelism: 1,
    memoryCost: 9216,
    timeCost: 4,
  });
  let username: string;

  try {
    const user_no = await redisClient.get("user_no");
    redisClient.set("user_no", Number(user_no) + 1);
    username = "USER" + user_no?.padStart(6, "0");
  } catch (error) {
    Logger.error(error, "An error occurred at registerUser.ts");
    throw error;
  }

  try {
    await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
        username: username,
      },
    });
  } catch (error) {
    Logger.error(error, "An error occurred at registerUser.ts");
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  return response.success();
}
