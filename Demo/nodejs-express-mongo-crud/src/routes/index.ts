import { Router, Response } from "express";
import user from "./profile.routes";

const router = Router();
router.get("/api/check", (_, res: Response) => res.sendStatus(200));

router.use(user);

export default router;
