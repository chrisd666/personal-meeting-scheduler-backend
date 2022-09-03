import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import MeetingService from "./meeting.service";

class MeetingMiddleware {
  private static instance: MeetingMiddleware;

  static getInstance() {
    if (!MeetingMiddleware.instance) {
      MeetingMiddleware.instance = new MeetingMiddleware();
    }

    return MeetingMiddleware.instance;
  }

  async validateCreateMeetingBodyFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      lengthInMinutes: Joi.string(),
      timeZone: Joi.string(),
      agenda: Joi.string(),
      guests: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
          })
        )
        .required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).send({ error });
    } else next();
  }

  async validateMeetingExists(req: Request, res: Response, next: NextFunction) {
    const existingMeeting = await MeetingService.readById(req.params.id);

    if (!existingMeeting) {
      res.status(401).send({ error: "Meeting not found" });
    } else next();
  }
}

export default MeetingMiddleware.getInstance();
