CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipeId" text NOT NULL,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"unit" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"imageUrl" text NOT NULL,
	"authorId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "steps" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipeId" text NOT NULL,
	"description" text NOT NULL,
	"order" integer NOT NULL
);
