import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const e = [];
      for (error of error.errors) e.push(error.message);
      log.error(`validate:\n${e.join("\n")}`);

      return res.status(400).send(error.errors);
    }
  };
