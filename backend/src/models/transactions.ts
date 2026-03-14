import { toJSONPlugin } from "@/lib/toJSON.plugin.js";
import type { TransactionBaseSchema } from "@/schema/transactions/base.js";
import mongoose, { Schema } from "mongoose";

export type ITransaction = {
  _id?: TransactionBaseSchema["id"];
  userId: TransactionBaseSchema["userId"];
  accountId: TransactionBaseSchema["accountId"];
  tagId: TransactionBaseSchema["tagId"];
  amount: TransactionBaseSchema["amount"];
  type: TransactionBaseSchema["type"];
  method: TransactionBaseSchema["method"];
  status: TransactionBaseSchema["status"];
  note?: TransactionBaseSchema["note"];
  date: TransactionBaseSchema["date"];
  __v?: number;
}

const transactionSchema = new Schema<ITransaction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'accounts',
    required: true
  },
  tagId: {
    type: Schema.Types.ObjectId,
    ref: 'tags',
    required: true
  },
  amount: {
    type: Number,
    min: 1,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Amount must be stored as integer"
    }
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    lowercase: true,
    required: true,
  },
  method: {
    type: String,
    enum: ["cash", "upi", "card", "bank"],
    lowercase: true,
    required: true
  },
  status: {
    type: String,
    enum: ["completed", "pending"],
    lowercase: true,
    required: true
  },
  note: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 500
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}, { timestamps: true });

transactionSchema.index({ userId: 1, date: -1 });

transactionSchema.plugin(toJSONPlugin);

export const Transaction = mongoose.model<ITransaction>("transactions", transactionSchema);