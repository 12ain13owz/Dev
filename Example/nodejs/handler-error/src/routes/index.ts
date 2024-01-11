import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    throw Object.assign(new Error("User already exists!"), {
      func: "Test Function Error",
      status: 400,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

export default router;
