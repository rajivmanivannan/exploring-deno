import db from "../config/databases.ts";
import validation from "../validation.ts";
import hash from "../util/hash.ts";
import { ObjectId } from "https://deno.land/x/mongo/mod.ts";

const userCollection = db.collection("users");

export default {
  async index(context: any) {
    const data = await userCollection.find();
    context.response.body = data;
  },
  async show(context: any) {
    try {
      const data = await userCollection.findOne(
        { _id: ObjectId(context.params.id) },
      );
      context.response.status = 200;
      context.response.body = data;
    } catch (e) {
      context.response.status = 404; // not nound
      context.response.body = { error: "User doesn't exist in the database" };
    }
  },
  async store(context: any) {
    const value = await validation.validate(context);
    if (value) {
      value.created_at = Date.now();
      value.password = await hash.bcrypt(value.password);
      const insertId = await userCollection.insertOne(value);
      context.response.status = 201; // Created
      context.response.body = insertId;
    }
  },
  async update(context: any) {
    const { value } = await context.request.body();
    const data = {
      email: value.email,
      name: value.name,
      password: value.password,
    };
    try {
      await userCollection.updateOne(
        { _id: ObjectId(context.params.id) },
        { $set: data },
      );
      context.response.status = 200; // Success
      context.response.body = { message: "User's name has been updated" };
    } catch (e) {
      context.response.status = 404; // not nound
      context.response.body = { error: "User doesn't exist in the database" };
    }
  },
  async destroy(context: any) {
    try {
      await userCollection.deleteOne({ _id: ObjectId(context.params.id) });
      context.response.status = 204; // No content
    } catch (e) {
      context.response.status = 404; // not nound
      context.response.body = { error: "User doesn't exist in the database" };
    }
  },
};
