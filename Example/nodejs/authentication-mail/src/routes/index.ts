import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";

const router = express.Router();

router.get("/healtcheck", (_, res) => {
  res.sendStatus(200);
});

router.use(auth);
router.use(user);

export default router;
