import { z } from "zod";

export const CancellationSchema = z.object({
  reference: z
    .string()
    .min(7, "Референс должен содержать минимум 7 символов")
    .max(7, "Референс должен содержать максимум 7 символов"),
  quantity: z.number().int().positive("Количество должно быть больше 0"),
  price: z.number().int().positive("Стоимость не может быть отрицательной"),
  reason: z.string().min(1, "Выбери причину отмены"),
  seller: z.string().min(1, "Выбери поставщика"),
  status: z.enum([
    "Новая отмена",
    "Отказ клиента",
    "Сроки истекли",
    "Ошибка синхронизации",
  ]),
});
