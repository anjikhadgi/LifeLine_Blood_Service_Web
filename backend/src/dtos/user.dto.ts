import { z } from "zod";
 
export const registerUserDto = z

  .object({

    fullName: z

      .string()

      .min(3, "Full name must be at least 3 characters"),
 
    bloodGroup: z

      .string()

      .min(1, "Blood group is required"),
 
    email: z

      .string()

      .email("Invalid email address"),
 
    phoneNumber: z

      .string()

      .min(10, "Phone number must be at least 10 digits"),
 
    address: z

      .string()

      .min(3, "Address is required"),
 
    password: z

      .string()

      .min(6, "Password must be at least 6 characters"),
 
    confirmPassword: z

      .string()

      .min(6, "Confirm password is required"),

  })

  .refine((data) => data.password === data.confirmPassword, {

    message: "Password and confirm password do not match",

    path: ["confirmPassword"],

  });
 
export const loginUserDto = z.object({

  email: z.string().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),

});
 


// import { z } from "zod";
// import { UserSchema } from "../types/user.type";

// // DTO for user registration
// export const CreateUserDTO = UserSchema.pick({
//   firstName: true,
//   lastName: true,
//   email: true,
//   username: true,
//   password: true,
// });

// export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

// // DTO for user login
// export const LoginUserDTO = UserSchema.pick({
//   email: true,
//   password: true,
// });

// export type LoginUserDTO = z.infer<typeof LoginUserDTO>;