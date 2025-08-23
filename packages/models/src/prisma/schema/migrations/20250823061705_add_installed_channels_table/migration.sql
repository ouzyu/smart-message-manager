-- CreateTable
CREATE TABLE "public"."installed_channels" (
    "id" SERIAL NOT NULL,
    "slack_team_id" VARCHAR(20) NOT NULL,
    "slack_channel_id" VARCHAR(20) NOT NULL,
    "installed_user_id" INTEGER NOT NULL,
    "is_important" BOOLEAN NOT NULL DEFAULT false,
    "installed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "installed_channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "installed_channels_slack_team_id_idx" ON "public"."installed_channels"("slack_team_id");

-- CreateIndex
CREATE UNIQUE INDEX "installed_channels_slack_team_id_slack_channel_id_key" ON "public"."installed_channels"("slack_team_id", "slack_channel_id");

-- AddForeignKey
ALTER TABLE "public"."installed_channels" ADD CONSTRAINT "installed_channels_slack_team_id_fkey" FOREIGN KEY ("slack_team_id") REFERENCES "public"."teams"("slack_team_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."installed_channels" ADD CONSTRAINT "installed_channels_installed_user_id_fkey" FOREIGN KEY ("installed_user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
