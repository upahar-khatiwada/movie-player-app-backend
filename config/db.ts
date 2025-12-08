import { Client, type QueryResult } from "pg";

const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Postgre SQL successfully connected");
  } catch (err) {
    console.error("Error connecting to DB: ", err);
  }
};

export const query = async (
  text: string,
  params? : any[]
): Promise<QueryResult<any>> => {
  try {
    return await client.query(text, params);
  } catch(err) {
    console.error("Error executing query: ", err );
    throw err;
  }
}

export const disconnectDB = async () => {
  await client.end();
  console.log("PostgreSQL disconnected");
};