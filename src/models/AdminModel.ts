import { Document, Model, model, Schema } from "mongoose";

export interface IAdminUser extends Document {
  username: string;
  password: string;
  role: "admin";
  active: boolean;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["admin"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminUserModel: Model<IAdminUser> = model("adminUsers", AdminUserSchema);

export default AdminUserModel;
