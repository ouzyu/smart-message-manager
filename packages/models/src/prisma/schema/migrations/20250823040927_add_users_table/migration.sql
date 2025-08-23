-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "slack_team_id" VARCHAR(20) NOT NULL,
    "slack_user_id" VARCHAR(20) NOT NULL,
    "firebase_user_id" VARCHAR(128) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_user_id_key" ON "public"."users"("firebase_user_id");

-- CreateIndex
CREATE INDEX "users_firebase_user_id_idx" ON "public"."users"("firebase_user_id");

-- CreateIndex
CREATE INDEX "users_slack_team_id_is_admin_idx" ON "public"."users"("slack_team_id", "is_admin");

-- CreateIndex
CREATE INDEX "users_deleted_at_idx" ON "public"."users"("deleted_at");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "public"."users"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_slack_team_id_slack_user_id_key" ON "public"."users"("slack_team_id", "slack_user_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_slack_team_id_fkey" FOREIGN KEY ("slack_team_id") REFERENCES "public"."teams"("slack_team_id") ON DELETE CASCADE ON UPDATE CASCADE;
