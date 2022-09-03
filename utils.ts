import { Response } from "express";

export const sendDefaultErrorRes = (res: Response) => {
  res.status(500).send({
    status: "failed",
    message: "Something went wrong",
  });
};
