import { Response } from "express";
import log from "../utils/logger";

interface ResponseError extends Error {
  func?: string;
  status?: number;
}

// ---------------------------------------------------------------- วิธีใช้งาน
// function instanceofResponseError(obj: any): obj is ResponseError {
//   return "message" in obj && "func" in obj && "status" in obj;
// }

// const e = {
//   message: "Internal Server Error",
//   func: "Not found function",
//   status: 500,
// };

// if (instanceofResponseError(error)) {
//   e.message = error.message;
//   e.func = error.func;
//   e.status = error.status;
// }
// ----------------------------------------------------------------

const handlerError = async (
  error: ResponseError,
  _: any, // จำเป็นต้องใส่
  res: Response,
  __: any // จำเป็นต้องใส่
) => {
  try {
    const message = error.message || "Internal Server Error!";
    const func = error.func || "Not found function!";
    const status = error.status || 500;

    log.error(`${func}: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    res.sendStatus(500);
  }
};

export default handlerError;
