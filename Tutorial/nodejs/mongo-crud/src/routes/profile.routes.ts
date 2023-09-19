import { Router } from "express";
import {
  createProfileHandler,
  deleteProfileHandler,
  findProfileHandler,
  findProfilebyIdHandler,
  updateProfileHandler,
} from "../controller/profile.controller";
import { createProfileSchema } from "../schema/profile.schema";
import { validate } from "../middleware/validate";
const router = Router();

router.get("/api/profile", findProfileHandler);
router.get("/api/profile/:id", findProfilebyIdHandler);
router.post(
  "/api/profile",
  validate(createProfileSchema),
  createProfileHandler
);
router.put("/api/profile/:id", updateProfileHandler);
router.delete("/api/profile/:id", deleteProfileHandler);

export default router;
