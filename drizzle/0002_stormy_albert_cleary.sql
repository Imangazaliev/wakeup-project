CREATE TABLE "volunteer_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"about_self" text NOT NULL,
	"about_traineeship" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
