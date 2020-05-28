import { MongoClient } from "https://deno.land/x/mongo/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("exploringDeno");

export default db;
