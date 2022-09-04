-- CreateTable
CREATE TABLE "Meeting" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lengthInMinutes" INT4 NOT NULL DEFAULT 15,
    "timeZone" STRING NOT NULL DEFAULT 'IST',
    "agenda" STRING,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "meetingId" UUID NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
