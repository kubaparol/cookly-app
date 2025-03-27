CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipeId" text NOT NULL,
	"name" text NOT NULL,
	"quantity" double precision NOT NULL,
	"unit" text NOT NULL,
	"createdAt" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"imageUrl" text NOT NULL,
	"authorId" text NOT NULL,
	"cuisineType" text NOT NULL,
	"mealType" text NOT NULL,
	"categories" text[] NOT NULL,
	"preparationTime" integer NOT NULL,
	"cookingTime" integer NOT NULL,
	"servings" integer NOT NULL,
	"difficulty" text NOT NULL,
	"dietaryTags" text[] NOT NULL,
	"notes" text,
	"createdAt" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "steps" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipeId" text NOT NULL,
	"description" text NOT NULL,
	"order" integer NOT NULL,
	"createdAt" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"clerkId" text PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"email" text,
	"imageUrl" text,
	"createdAt" timestamp (3) DEFAULT now()
);
