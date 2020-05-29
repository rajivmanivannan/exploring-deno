import db from "../config/databases.ts";
import validation from "../validation.ts";
import hash from "../util/hash.ts";
import token from "../util/token.ts";

const userCollection = db.collection("users"); // get user collection from database.

export default {
  async login(context: any) {
    const value = await validation.validateLogin(context);
    if (!value) {
      return;
    }

    const user = await userCollection.findOne({ email: value.email });
    if (!user) {
      context.response.status = 422;
      context.response.body = {
        errors: {
          message: "User with email: " + value.email +
            "is dosen't exist in our database",
        },
      };
      return;
    }

    const passwordMatched = hash.verify(value.password, user.password);
    if (!passwordMatched) {
      context.response.body = { error: "Password is incorrect" };
      return;
    }
    context.response.body = token.generate(user._id.$oid);
  },
};
