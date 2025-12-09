export const requestTMDB = async (url: string) => {
  const res: Response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch data from TMDB" + res.statusText);
  }

  return res.json();
};
