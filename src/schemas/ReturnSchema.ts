import { z } from "zod";

export const ReturnSchema = z.object({
  reference: z
    .string()
    .min(7, "Референс должен содержать минимум 7 символов")
    .max(7, "Референс должен содержать максимум 7 символов"),

  quantity: z.number().int().positive("Количество должно быть больше 0"),
  price: z.number().int().positive("Стоимость не может быть отрицательной"),
  reason: z.string().min(1, "Выбери причину возврата"),
  seller: z.string().min(1, "Выбери поставщика"),
  status: z.enum([
    "Новый возврат",
    "Запрос поставщику",
    "Запрос на возврат",
    "Запрос на утиль",
    "Возврат получен",
    "Возврат проведен",
  ]),
});
