import { Model, model, Schema } from "mongoose";

const ModelSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<TUser> = model("users", ModelSchema);

export default UserModel;
