"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function instanceofResponseError(obj) {
    return "message" in obj && "func" in obj && "status" in obj;
}
const handlerError = (error, _, res) => {
    console.log(7);
    const e = {
        message: "Internal Server Error",
        func: "Not found function",
        status: 500,
    };
    if (instanceofResponseError(error)) {
        e.message = error.message;
        e.func = error.func;
        e.status = error.status;
    }
    console.log("Error Test:", e.message);
    res.status(e.status).json({
        message: e.message,
    });
};
exports.default = handlerError;
