import { Request, Response } from "express";
import { sendDefaultErrorRes } from "../utils";
import MeetingService from "./meeting.service";

class MeetingController {
  private static instance: MeetingController;

  static getInstance() {
    if (!MeetingController.instance) {
      MeetingController.instance = new MeetingController();
    }

    return MeetingController.instance;
  }

  async create(req: Request, res: Response) {
    const meeting = await MeetingService.create(req.body);

    if (meeting) {
      return res.status(201).send({
        status: "success",
        message: "Meeting successfully created",
        payload: meeting,
      });
    }

    sendDefaultErrorRes(res);
  }

  async list(req: Request, res: Response) {
    const meetings = await MeetingService.list();

    if (meetings) {
      return res.status(200).send({
        status: "success",
        message: "Meetings successfully fetched",
        payload: meetings,
      });
    }

    sendDefaultErrorRes(res);
  }

  async readById(req: Request, res: Response) {
    const meeting = await MeetingService.readById(req.params.id);

    if (meeting) {
      return res.status(200).send({
        status: "success",
        message: "Meeting successfully fetched",
        payload: meeting,
      });
    }

    sendDefaultErrorRes(res);
  }

  async update(req: Request, res: Response) {
    const meetings = await MeetingService.update(req.params.id, req.body);

    if (meetings) {
      return res.status(200).send({
        status: "success",
        message: "Meetings successfully updated",
        payload: meetings,
      });
    }

    sendDefaultErrorRes(res);
  }

  async delete(req: Request, res: Response) {
    const meeting = await MeetingService.delete(req.params.id);

    if (meeting) {
      return res.status(200).send({
        status: "success",
        message: "Meeting successfully deleted",
        payload: meeting,
      });
    }

    sendDefaultErrorRes(res);
  }
}

export default MeetingController.getInstance();
