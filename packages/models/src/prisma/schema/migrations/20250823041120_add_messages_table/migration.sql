-- CreateTable
CREATE TABLE "public"."messages" (
    "id" BIGSERIAL NOT NULL,
    "slack_team_id" VARCHAR(20) NOT NULL,
    "mentioned_user_id" VARCHAR(20) NOT NULL,
    "slack_message_id" VARCHAR(20) NOT NULL,
    "slack_channel_id" VARCHAR(20) NOT NULL,
    "slack_thread_id" VARCHAR(20) NOT NULL,
    "is_notified" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "messages_slack_team_id_mentioned_user_id_idx" ON "public"."messages"("slack_team_id", "mentioned_user_id");

-- CreateIndex
CREATE INDEX "messages_slack_team_id_slack_channel_id_idx" ON "public"."messages"("slack_team_id", "slack_channel_id");

-- CreateIndex
CREATE INDEX "messages_is_notified_created_at_idx" ON "public"."messages"("is_notified", "created_at");

-- CreateIndex
CREATE INDEX "messages_created_at_idx" ON "public"."messages"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "messages_slack_team_id_slack_channel_id_slack_message_id_key" ON "public"."messages"("slack_team_id", "slack_channel_id", "slack_message_id");

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_slack_team_id_fkey" FOREIGN KEY ("slack_team_id") REFERENCES "public"."teams"("slack_team_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_slack_team_id_mentioned_user_id_fkey" FOREIGN KEY ("slack_team_id", "mentioned_user_id") REFERENCES "public"."users"("slack_team_id", "slack_user_id") ON DELETE CASCADE ON UPDATE CASCADE;
