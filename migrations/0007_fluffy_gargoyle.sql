CREATE TABLE IF NOT EXISTS "views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipeId" uuid NOT NULL,
	"ipAddress" varchar(45) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "views_recipeId_ipAddress_unique" UNIQUE("recipeId","ipAddress")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "views" ADD CONSTRAINT "views_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
