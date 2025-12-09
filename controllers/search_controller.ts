import { searchHistoryUpdater } from "../helper/search_history_updater";
import { requestTMDB } from "../services/tmdb_api_service";
import { type Request, type Response } from "express";

// search for collections
export const searchForCollections = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;

    const userId: number | undefined = req.user?.id;

    if (!userId || !query) {
      return res.status(401).json({
        success: false,
        message: "Missing user authentication or search query",
      });
    }

    await searchHistoryUpdater(userId, query);

    const result = await requestTMDB(
      `https://api.themoviedb.org/3/search/collection?query=${query}`
    );

    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search for collections",
    });
  }
};

// search for movies
export const searchForMovies = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;

    const userId: number | undefined = req.user?.id;

    if (!userId || !query) {
      return res.status(401).json({
        success: false,
        message: "Missing user authentication or search query",
      });
    }

    await searchHistoryUpdater(userId, query);

    const result = await requestTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}`
    );

    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search for movies",
    });
  }
};

// search for multi (movies, tv, people)
export const searchForMultipleRequests = async (
  req: Request,
  res: Response
) => {
  try {
    const { query } = req.params;

    const userId: number | undefined = req.user?.id;

    if (!userId || !query) {
      return res.status(401).json({
        success: false,
        message: "Missing user authentication or search query",
      });
    }

    await searchHistoryUpdater(userId, query);

    const result = await requestTMDB(
      `https://api.themoviedb.org/3/search/multi?query=${query}`
    );

    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search for multiple types",
    });
  }
};

// search for people
export const searchForPerson = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;

    const userId: number | undefined = req.user?.id;

    if (!userId || !query) {
      return res.status(401).json({
        success: false,
        message: "Missing user authentication or search query",
      });
    }

    await searchHistoryUpdater(userId, query);

    const result = await requestTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}`
    );

    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search for people",
    });
  }
};

// search for TV shows
export const searchForTV = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;

    const userId: number | undefined = req.user?.id;

    if (!userId || !query) {
      return res.status(401).json({
        success: false,
        message: "Missing user authentication or search query",
      });
    }

    await searchHistoryUpdater(userId, query);

    const result = await requestTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}`
    );

    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search for TV shows",
    });
  }
};
