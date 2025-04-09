import { z } from "zod";

export const AuthorizationSchema = z.object({
  login: z.string().min(1, "Введи логин"),
  password: z
    .string()
    .min(6, "Пароль должен состоять не менее чем из 6 символов"),
});
