export interface RegisterUserInput {
  fullName: string;
  bloodGroup: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}
 
export interface LoginUserInput {
  email: string;
  password: string;
}


// import { z } from "zod";

// export const UserSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   email: z.string().email("Invalid email address"),
//   username: z.string().min(3, "Username must be at least 3 character long"),
//   password: z.string().min(6, "Password must be at least 6 character long"),
//   role: z.enum(["admin", "user"]).default("user"),
// });

// export type UserType = z.infer<typeof UserSchema>;