import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import MeetingController from "./meeting.controller";
import MeetingMiddleware from "./meeting.middleware";

export class MeetingRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "MeetingRoutes");
  }

  configureRoutes(): Application {
    this.app
      .route("/meetings")
      .get(MeetingController.list)
      .post(
        MeetingMiddleware.validateCreateMeetingBodyFields,
        MeetingController.create
      );

    this.app
      .route("/meetings/:id")
      .all(MeetingMiddleware.validateMeetingExists)
      .get(MeetingController.readById)
      .patch(MeetingController.update)
      .delete(MeetingController.delete);

    return this.app;
  }
}
