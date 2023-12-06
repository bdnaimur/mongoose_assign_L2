import { z } from 'zod';

export const TOrderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
}).partial();

const userNameSchema = z.object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
    lastName:  z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Last Name must start with a capital letter',
    }),
  });

// Zod schema for TUser
const userVAlidationWithZod = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(TOrderSchema).optional(),
  isDeleted: z.boolean().default(false)
});



export const userUpdateVAlidationWithZod = z.object({
  userId: z.number().positive(),
  username: z.string().max(30),
  password: z.string(),
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
  orders: z.array(TOrderSchema).optional(),
  isDeleted: z.boolean().optional().default(false),
}).partial();

export default userVAlidationWithZod;