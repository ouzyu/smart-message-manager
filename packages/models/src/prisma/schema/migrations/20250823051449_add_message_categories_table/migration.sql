-- CreateTable
CREATE TABLE "public"."master_message_categories" (
    "id" SERIAL NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "category_description" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "master_message_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message_categories" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "category_description" VARCHAR(200) NOT NULL,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "message_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "message_categories_user_id_idx" ON "public"."message_categories"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_categories_user_id_category_name_key" ON "public"."message_categories"("user_id", "category_name");

-- CreateIndex
CREATE UNIQUE INDEX "message_categories_user_id_display_order_key" ON "public"."message_categories"("user_id", "display_order");

-- AddForeignKey
ALTER TABLE "public"."message_categories" ADD CONSTRAINT "message_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
