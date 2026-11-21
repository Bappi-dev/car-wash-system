import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { role } from "better-auth/plugins";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI as string);
const db = client.db("bappi-car");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: ["admin", "user", "branchManager"],
         input: false,
        defaultValue: "user"
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
