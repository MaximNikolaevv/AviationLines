import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const authSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

authSchema.pre("save", async function hashPassword() {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", authSchema);

export default User;
