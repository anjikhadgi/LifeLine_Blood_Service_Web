import { Request, Response } from "express";

import UserService from "../services/user.service";

import { registerUserDto, loginUserDto } from "../dtos/user.dto";
 
class UserController {

  async register(req: Request, res: Response) {

    try {

      const validatedData = registerUserDto.parse(req.body);
 
      const result = await UserService.registerUser(validatedData);
 
      return res.status(201).json({

        success: true,

        ...result,

      });

    } catch (error: any) {

      return res.status(400).json({

        success: false,

        message: error.errors ? error.errors[0].message : error.message,

      });

    }

  }
 
  async login(req: Request, res: Response) {

    try {

      const validatedData = loginUserDto.parse(req.body);
 
      const result = await UserService.loginUser(validatedData);
 
      return res.status(200).json({

        success: true,

        ...result,

      });

    } catch (error: any) {

      return res.status(400).json({

        success: false,

        message: error.errors ? error.errors[0].message : error.message,

      });

    }

  }

}
 
export default new UserController();
 

// import { UserService } from "../services/user.service";
// import { z } from "zod";
// import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
// import { Request, Response } from "express";
// import { ApiResponseHelper } from "../uttils/apihelper.util";

// const userService = new UserService();

// export class UserController {
//   async createUser(req: Request, res: Response) {
//     try {
//       const userData = CreateUserDTO.safeParse(req.body);

//       if (!userData.success) {
//         return ApiResponseHelper.error(
//           res,
//           z.prettifyError(userData.error),
//           400,
//         );
//       }

//       const user = await userService.createUser(userData.data);

//       return ApiResponseHelper.success(
//         res,
//         user,
//         "User created successfully",
//       );
//     } catch (error: Error | any | unknown) {
//       return ApiResponseHelper.error(
//         res,
//         error.message || "Internal Server Error",
//         error.status || 500,
//       );
//     }
//   }

//   async loginUser(req: Request, res: Response) {
//     try {
//       const parsedData = LoginUserDTO.safeParse(req.body);

//       if (!parsedData.success) {
//         return ApiResponseHelper.error(
//           res,
//           z.prettifyError(parsedData.error),
//           400,
//         );
//       }

//       const { user, token } = await userService.loginUser(parsedData.data);

//       return ApiResponseHelper.success(
//         res,
//         { user, token },
//         "Login successful",
//       );
//     } catch (error: Error | any | unknown) {
//       return ApiResponseHelper.error(
//         res,
//         error.message || "Internal Server Error",
//         error.status || 500,
//       );
//     }
//   }
// }