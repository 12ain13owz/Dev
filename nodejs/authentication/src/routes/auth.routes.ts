import express from "express";
import validateResource from "../middleware/validate.resourse";
import { createSessionSchma } from "../schema/auth.schema";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controller/auth.controller";
const router = express.Router();

router.post(
  "/api/session",
  validateResource(createSessionSchma),
  createSessionHandler
);

router.post("/api/session/refresh", refreshAccessTokenHandler);

export default router;
