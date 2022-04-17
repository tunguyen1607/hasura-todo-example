CREATE TABLE "public"."audit"("id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "description" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
