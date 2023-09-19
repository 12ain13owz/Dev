import express from "express";
import validateResource from "../middleware/validate.resourse";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schema/user.schema";
import {
  createUserHandler,
  forgotPaswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyserHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
const router = express.Router();

router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler
);

router.get("/api/users", (req, res) => {
  res.sendStatus(200);
});

router.post(
  "/api/users/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyserHandler
);

router.post(
  "/api/users/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPaswordHandler
);

router.post(
  "/api/users/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get("/api/users/me", requireUser, getCurrentUserHandler);

export default router;
