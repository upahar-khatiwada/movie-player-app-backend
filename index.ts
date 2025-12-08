import express from "express";
import { connectDB, query } from "./config/db";

const app = express();

const PORT: string | undefined = process.env.PORT;

const connectToDataBaseAndCreateTable = async () => {
  await connectDB();
  const res = await query(
    `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    search_history JSONB DEFAULT '[]'
  );`
  );

  // console.log("res object: ", res);
};

app.get("/", (res, req) => {

});

app.listen(PORT, async () => {
  connectToDataBaseAndCreateTable();
  console.log("Server started at http://localhost:" + PORT);
});
