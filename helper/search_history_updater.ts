import { query } from "../config/db";

export const searchHistoryUpdater = async (userId: number, searchQuery: string) => {
  await query(
    `
      UPDATE users
      SET search_history = search_history || $1::jsonb
      WHERE id = $2
    `,
    [JSON.stringify(searchQuery), userId]
  );
};
