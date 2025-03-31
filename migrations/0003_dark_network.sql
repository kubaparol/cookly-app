ALTER TABLE "recipes" ALTER COLUMN "averageRating" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;