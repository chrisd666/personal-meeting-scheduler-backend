import dayjs from "dayjs";
import prisma from "../prisma/client";
import { CreateMeetingDto, UpdateMeetingDto } from "./meeting.dto";

class MeetingService {
  private static instance: MeetingService;

  static getInstance() {
    if (!MeetingService.instance) {
      MeetingService.instance = new MeetingService();
    }

    return MeetingService.instance;
  }

  model = prisma.meeting;

  async create(data: CreateMeetingDto) {
    const lengtInMinutes = data.lengthInMinutes || 15;
    const endsAt = dayjs(data.createdAt).add(lengtInMinutes, "m").toDate();
    const guests = data.guests || [];

    return await this.model.create({
      data: {
        ...data,
        endsAt,
        guests: {
          create: guests,
        },
      },
    });
  }

  async list() {
    return await this.model.findMany({
      include: {
        guests: true,
      },
    });
  }

  async readById(id: string) {
    try {
      return await this.model.findUnique({
        where: { id },
        include: { guests: true },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: string, data: UpdateMeetingDto) {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.model.delete({ where: { id } });
  }
}

export default MeetingService.getInstance();
