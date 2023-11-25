import { ZodError, z } from 'zod';

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userNameSchema = z.object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
    lastName: z.string(),
  });

const userVAlidationWithZod = z.object({
  userId: z.number().positive(),
  username: z.string().max(30),
  password: z.union([
    z.string(),
    z.number(),
  ]),
  fullName: userNameSchema,
  age: z.number().int()
  .min(18, { message: 'Age must be at least 18 years old' })
  .max(99, { message: 'Age must be at most 99 years old' }),
  email: z.string().email(),
  isActive:z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderSchema),
  isDeleted: z.boolean().optional().default(false),
});

export default userVAlidationWithZod;