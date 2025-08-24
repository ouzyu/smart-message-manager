/*
  Warnings:

  - Changed the type of `mentioned_user_id` on the `messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_slack_team_id_mentioned_user_id_fkey";

-- DropIndex
DROP INDEX "public"."messages_slack_team_id_mentioned_user_id_idx";

-- DropIndex
DROP INDEX "public"."messages_slack_team_id_slack_channel_id_slack_message_id_key";

-- AlterTable
ALTER TABLE "public"."messages" DROP COLUMN "mentioned_user_id",
ADD COLUMN     "mentioned_user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "messages_mentioned_user_id_idx" ON "public"."messages"("mentioned_user_id");

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_mentioned_user_id_fkey" FOREIGN KEY ("mentioned_user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
