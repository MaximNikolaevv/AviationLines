import User from "../models/auth.js";


export default {

    async registedUser(userData) {

        return await User.create(userData);
    },
}