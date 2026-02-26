import { Router } from "express";
import { validate } from "@/middleware/validate.middleware.js";
import { loginController, logoutAllController, logoutController, meController, refreshTokenController, signupController } from "@/controllers/auth.js";

import { createSignUpSchema } from "@/schema/auth/signup.js";
import { createLoginSchema } from "@/schema/auth/login.js";
import { authMiddleware } from "@/middleware/auth.middleware.js";

export const authRouter = Router();

authRouter
  .post('/signup', validate(createSignUpSchema), signupController)
  .post('/login', validate(createLoginSchema), loginController)
  .get('/me', authMiddleware, meController)
  .post("/refresh", refreshTokenController)
  .post("/logout", authMiddleware, logoutController)
  .post("/logout-all", authMiddleware, logoutAllController);


