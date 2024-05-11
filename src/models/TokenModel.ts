import { Document, Model, model, Schema } from "mongoose";

export interface IToken extends Document {
  token: string;
  expiryDate: number;
  userId: Schema.Types.ObjectId;
  role: "admin" | "user" | "vendor";
}

const TokenSchema = new Schema<IToken>(
  {
    token: String,
    expiryDate: Number,
    userId: Schema.Types.ObjectId,
    role: String,
  },
  {
    timestamps: true,
  }
);

const TokenModel: Model<IToken> = model("tokens", TokenSchema);

export default TokenModel;
