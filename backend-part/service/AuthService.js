import User from "../models/models.js";
import bcrypt from "bcrypt";

export default {
  async registedUser(userData) {
    return await User.create(userData);
  },

  async findUserByEmail(email) {
    return await User.findOne({ email });
  },

  async login(userData) {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPassword = await bcrypt.compare(userData.password, user.password);

    if (!isPassword) {
      console.log("Incorrect password");
      throw new Error("Invalid email or password");
    }

    return user;
  },

};

