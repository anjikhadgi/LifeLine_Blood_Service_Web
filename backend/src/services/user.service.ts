import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import UserRepository from "../repositories/user.repository";

import { RegisterUserInput, LoginUserInput } from "../types/user.type";
import { SECRET_KEY } from "../configs/constant";
 
class UserService {

  async registerUser(data: RegisterUserInput) {

    const existingUser = await UserRepository.findUserByEmail(data.email);
 
    if (existingUser) {

      throw new Error("User already exists with this email");

    }
 
    const hashedPassword = await bcrypt.hash(data.password, 10);
 
    const user = await UserRepository.createUser({

      fullName: data.fullName,
      username: data.email,

      bloodGroup: data.bloodGroup,

      email: data.email,

      phoneNumber: data.phoneNumber,

      address: data.address,

      password: hashedPassword,

      role: "donor",

    });
 
    return {

      message: "User registered successfully",

      user: {

        id: user._id,

        fullName: user.fullName,

        bloodGroup: user.bloodGroup,

        email: user.email,

        phoneNumber: user.phoneNumber,

        address: user.address,

        role: user.role,

      },

    };

  }
 
  async loginUser(data: LoginUserInput) {

    const user = await UserRepository.findUserByEmail(data.email);
 
    if (!user) {

      throw new Error("Invalid email or password");

    }
 
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
 
    if (!isPasswordValid) {

      throw new Error("Invalid email or password");

    }
 
    const token = jwt.sign(

      {

        id: user._id,

        email: user.email,

        role: user.role,

      },

      SECRET_KEY,

      {

        expiresIn: "7d",

      }

    );
 
    return {

      message: "Login successful",

      token,

      user: {

        id: user._id,

        fullName: user.fullName,

        bloodGroup: user.bloodGroup,

        email: user.email,

        phoneNumber: user.phoneNumber,

        address: user.address,

        role: user.role,

      },

    };

  }

}
 
export default new UserService();
 

// import { UserMongoRepository } from "../repositories/user.repository";
// import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
// import { IUser } from "../models/user.model";
// import { HttpException } from "../exceptions/http-exception";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { SECRET_KEY } from "../configs/constant";

// const userRepository = new UserMongoRepository();

// export class UserService {
//   async createUser(userData: CreateUserDTO): Promise<IUser> {
//     // validation
//     const existingEmail = await userRepository.getUserByEmail(userData.email);

//     if (existingEmail) {
//       throw new HttpException(400, "Email already exists");
//     }

//     const existingUsername = await userRepository.getUserByUsername(
//       userData.username,
//     );

//     if (existingUsername) {
//       throw new HttpException(400, "Username already exists");
//     }

//     // hash password
//     const hashedPassword = await bcryptjs.hash(userData.password, 10);

//     userData.password = hashedPassword;

//     const user = await userRepository.createUser(userData);

//     return user;
//   }

//   async loginUser(loginData: LoginUserDTO) {
//     const user = await userRepository.getUserByEmail(loginData.email);

//     if (!user) {
//       throw new HttpException(400, "Invalid email");
//     }

//     const isPasswordValid = await bcryptjs.compare(
//       loginData.password, // client password
//       user.password, // database password
//     );

//     if (!isPasswordValid) {
//       throw new HttpException(400, "Invalid password");
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//       SECRET_KEY,
//       {
//         expiresIn: "30d",
//       },
//     );

//     return {
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//       },
//       token,
//     };
//   }
// }