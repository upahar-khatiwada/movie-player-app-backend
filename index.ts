import express from "express";
import { connectDB, query } from "./config/db";
import authRouter from "./routes/auth_route";
import movieRouter from "./routes/movie_route";
import searchRouter from "./routes/search_route";
import { authMiddleware } from "./middlewares/auth_middleware";

const app = express();

const PORT: string | undefined = process.env.PORT;

const connectToDataBaseAndCreateTable = async () => {
  await connectDB();
  await query(
    `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    search_history JSONB DEFAULT '[]'
  );`
  );

  await query(`CREATE TABLE IF NOT EXISTS user_tokens (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  refresh_token VARCHAR(500),
  expires_at TIMESTAMPTZ
);
`);
};

// ------------ MIDDLEWARES ------------
app.use(express.json());

// ------------ ROUTES ------------
app.use("/auth", authRouter);
app.use("/api/v1/movie", authMiddleware, movieRouter);
app.use("/api/v1/search", authMiddleware, searchRouter);

app.listen(PORT, async () => {
  await connectToDataBaseAndCreateTable();
  console.log("Server started at http://localhost:" + PORT);
});
