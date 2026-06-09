import { Router } from "express";

import UserController from "../controllers/user.controller";
 
const router = Router();
 
router.post("/register", UserController.register);

router.post("/login", UserController.login);
 
export default router;
 

// import { Router } from "express";
// import { UserController } from "../controllers/user.controller";

// const userRouter = Router();
// const userController = new UserController();

// userRouter.post("/register", userController.createUser);
// userRouter.post("/login", userController.loginUser);

// export default userRouter;