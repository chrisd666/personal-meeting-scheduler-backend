import { Prisma } from "@prisma/client";

export type CreateMeetingDto = Omit<
  Prisma.MeetingCreateInput,
  "endsAt" | "guests"
> & {
  guests: {
    name: string;
    email: string;
  }[];
};

export type UpdateMeetingDto = Partial<
  Omit<Prisma.MeetingCreateInput, "guests">
>;
