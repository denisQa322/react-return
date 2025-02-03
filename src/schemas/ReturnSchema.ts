import { z } from "zod";

export const ReturnSchema = z.object({
  reference: z
    .number()
    .int()
    .positive()
    .refine((val) => val.toString().length === 7, {
      message: "Референс должен содержать ровно 7 цифр",
    }),
  quantity: z.number().int().positive("Количество должно быть больше 0"),
  price: z.number().int().positive("Стоимость не может быть отрицательной"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Некорректный формат даты")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Некорректная дата")
    .refine((val) => {
      const inputDate = new Date(val);
      inputDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return inputDate <= today;
    }, "Дата не может быть будущей"),
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
