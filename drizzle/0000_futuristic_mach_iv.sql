CREATE TYPE "public"."transactionCategory" AS ENUM('HOUSING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'UTILITIES', 'SALARY', 'EDUCATION', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."transactionPaymentMethod" AS ENUM('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."transactionType" AS ENUM('DEPOSIT', 'EXPENSE', 'INVESTMENT');--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "transactionType" NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"category" "transactionCategory" NOT NULL,
	"paymentMethod" "transactionPaymentMethod" NOT NULL,
	"date" timestamp NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;