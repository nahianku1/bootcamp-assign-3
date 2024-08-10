import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interfaces";
import config from "../../config/config";

export const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    role: {
      type: String,
      enum: { values: ["admin", "user"], message: `{VALUE} is not supported` },
      default: "user",
      required: true,
    },

    password: { type: String, maxLength: 20, select: 0 },

    phone: {
      type: String,
      unique: true,
      required: true,
    },

    address: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        const { _id, status, password, isDeleted, ...rest } = ret;
        return { _id, ...rest };
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password!, Number(config.bcrypt_salt));
  next();
});

export const UserModel = model<TUser>("User", userSchema);
