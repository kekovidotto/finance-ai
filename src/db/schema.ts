import {
  decimal,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Enums
export const transactionTypeEnum = pgEnum("transactionType", [
  "DEPOSIT",
  "EXPENSE",
  "INVESTMENT",
]);

export const transactionCategoryEnum = pgEnum("transactionCategory", [
  "HOUSING",
  "TRANSPORTATION",
  "FOOD",
  "ENTERTAINMENT",
  "HEALTH",
  "UTILITIES",
  "SALARY",
  "EDUCATION",
  "OTHER",
]);

export const transactionPaymentMethodEnum = pgEnum("transactionPaymentMethod", [
  "CREDIT_CARD",
  "DEBIT_CARD",
  "BANK_TRANSFER",
  "BANK_SLIP",
  "CASH",
  "PIX",
  "OTHER",
]);

// Users Table
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});

// Transactions Table
export const transactionsTable = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: transactionTypeEnum().notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  category: transactionCategoryEnum().notNull(),
  paymentMethod: transactionPaymentMethodEnum().notNull(),
  date: timestamp("date").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
