-- CreateTable
CREATE TABLE "public"."user_settings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "send_daily_report" BOOLEAN NOT NULL DEFAULT false,
    "send_report_time" VARCHAR(5) NOT NULL DEFAULT '18:00',
    "send_monday" BOOLEAN NOT NULL DEFAULT true,
    "send_tuesday" BOOLEAN NOT NULL DEFAULT true,
    "send_wednesday" BOOLEAN NOT NULL DEFAULT true,
    "send_thursday" BOOLEAN NOT NULL DEFAULT true,
    "send_friday" BOOLEAN NOT NULL DEFAULT true,
    "send_saturday" BOOLEAN NOT NULL DEFAULT false,
    "send_sunday" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "public"."user_settings"("user_id");

-- CreateIndex
CREATE INDEX "user_settings_user_id_idx" ON "public"."user_settings"("user_id");

-- AddForeignKey
ALTER TABLE "public"."user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
