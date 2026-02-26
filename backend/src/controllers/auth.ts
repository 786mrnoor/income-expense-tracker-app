import type { Request, Response } from "express";
import { response, sendResponse } from "@/utils/appResponse.js";
import { clearSession, setSession } from "@/utils/session.js";
import type { ValidatedRequest } from "@/types/validation.js";

import type { CreateSignUpSchema } from "@/schema/auth/signup.js";
import type { CreateLoginSchema } from "@/schema/auth/login.js";

import signupService from "@/services/auth/signup.service.js";
import loginService from "@/services/auth/login.service.js";
import refreshTokenService from "@/services/auth/refreshToken.service.js";
import logoutService from "@/services/auth/logout.service.js";
import logoutAllService from "@/services/auth/logoutAll.service.js";

export async function signupController(req: ValidatedRequest<CreateSignUpSchema>, res: Response) {
  const result = await signupService(req.body);
  sendResponse(res, result);
}

export async function loginController(req: ValidatedRequest<CreateLoginSchema>, res: Response) {
  const [refreshToken, result] = await loginService(req.body, req.headers['user-agent'], req.ip);

  setSession(res, refreshToken);
  sendResponse(res, result);
}

export async function meController(req: Request, res: Response) {
  const user = req.user!;
  const result = response(200, {
    id: user.id,
    name: user.name,
    email: user.email,
  });
  sendResponse(res, result);
}

export async function refreshTokenController(req: Request, res: Response) {
  const [refreshToken, result] = await refreshTokenService(req.cookies.refreshToken);

  setSession(res, refreshToken);
  sendResponse(res, result);
}

export async function logoutController(req: Request, res: Response) {
  await logoutService(req.user!);

  clearSession(res);
  res.sendStatus(204);
}

export const logoutAllController = async (req: Request, res: Response) => {
  await logoutAllService(req.user!.id);

  clearSession(res);
  res.sendStatus(204);
};