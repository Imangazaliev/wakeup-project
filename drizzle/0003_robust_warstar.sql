ALTER TABLE "volunteer_requests" ADD COLUMN "status" text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD COLUMN "processed_by" integer;--> statement-breakpoint
ALTER TABLE "volunteer_requests" ADD CONSTRAINT "volunteer_requests_processed_by_users_id_fk" FOREIGN KEY ("processed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;