import express from "express";
import { connectDB, query } from "./config/db";
import authRouter from "./routes/auth_route";

const app = express();

const PORT: string | undefined = process.env.PORT;

const connectToDataBaseAndCreateTable = async () => {
  await connectDB();
  await query(
    `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    search_history JSONB DEFAULT '[]'
  );`
  );

  // console.log("res object: ", res);
};

// ------------ MIDDLEWARES ------------
app.use(express.json());

// ------------ ROUTES ------------
app.use("/auth", authRouter);

app.listen(PORT, async () => {
  await connectToDataBaseAndCreateTable();
  console.log("Server started at http://localhost:" + PORT);
});
