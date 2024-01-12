-- CreateTable
CREATE TABLE "customers" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripe_customer_id" VARCHAR,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "song_id" BIGINT,
    "user_id" VARCHAR,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN,
    "currency" VARCHAR,
    "description" VARCHAR,
    "interval" BIGINT,
    "interval_count" BIGINT,
    "metadata" JSON,
    "product_id" VARCHAR,
    "trial_period_days" BIGINT,
    "unit_amount" BIGINT,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN,
    "description" VARCHAR,
    "image" VARCHAR,
    "metadata" JSON,
    "name" VARCHAR,
    "price_id" BIGINT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "email" TEXT,
    "username" TEXT,
    "avatar_url" TEXT,
    "website" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" VARCHAR,
    "image_path" VARCHAR,
    "song_path" VARCHAR,
    "title" VARCHAR DEFAULT '',
    "user_id" VARCHAR,
    "description" VARCHAR NOT NULL DEFAULT '',
    "genre" VARCHAR NOT NULL DEFAULT '',
    "mood" VARCHAR NOT NULL DEFAULT '',
    "tags" VARCHAR NOT NULL DEFAULT '',
    "release_date" VARCHAR NOT NULL DEFAULT '',
    "remix_of" BIGINT,
    "duration" VARCHAR NOT NULL DEFAULT '',
    "downloadable" VARCHAR NOT NULL DEFAULT '',

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancel_at " VARCHAR,
    "cancel_at_period_end " BOOLEAN,
    "canceled_at " VARCHAR,
    "created" VARCHAR,
    "current_period_end" VARCHAR,
    "current_period_start" VARCHAR,
    "ended_at" VARCHAR,
    "metadata" JSON,
    "quantity" INTEGER,
    "trial_end" VARCHAR,
    "trial_start" VARCHAR,
    "user_id" VARCHAR,
    "status" VARCHAR,
    "price_id" BIGINT,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar_url" VARCHAR,
    "billing_address " JSON,
    "full_name" VARCHAR,
    "payment_method" JSON,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
