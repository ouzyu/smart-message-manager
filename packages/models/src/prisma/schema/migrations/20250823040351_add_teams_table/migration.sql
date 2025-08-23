-- CreateTable
CREATE TABLE "public"."teams" (
    "id" SERIAL NOT NULL,
    "slack_team_id" VARCHAR(20) NOT NULL,
    "slack_team_name" VARCHAR(255) NOT NULL DEFAULT 'Unnamed Workspace',
    "slack_workspace_domain" VARCHAR(100) NOT NULL,
    "slack_bot_token" TEXT NOT NULL,
    "slack_bot_user_id" VARCHAR(20) NOT NULL,
    "slack_app_id" VARCHAR(20) NOT NULL,
    "installed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_slack_team_id_key" ON "public"."teams"("slack_team_id");

-- CreateIndex
CREATE INDEX "teams_slack_team_id_installed_at_idx" ON "public"."teams"("slack_team_id", "installed_at");
