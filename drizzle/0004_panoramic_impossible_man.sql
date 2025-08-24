CREATE TABLE "families" (
	"id" serial PRIMARY KEY NOT NULL,
	"city" text NOT NULL,
	"address" text NOT NULL,
	"contact_person_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "persons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sex" text NOT NULL,
	"phone_number" varchar(20),
	"birth_date" date
);
--> statement-breakpoint
ALTER TABLE "families" ADD CONSTRAINT "families_contact_person_id_persons_id_fk" FOREIGN KEY ("contact_person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;