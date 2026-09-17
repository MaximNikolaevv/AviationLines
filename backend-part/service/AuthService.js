import User from "../models/models.js";

export default {
  async registedUser(userData) {
    return await User.create(userData);
  },

  async findUserByEmail(email) {
    return await User.findOne({ email });
  },
};

