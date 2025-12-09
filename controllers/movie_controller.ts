import { requestTMDB } from "../services/tmdb_api_service";
import { type Request, type Response } from "express";

// fetches the currently trending movies
export const getTrendingMovie = async (req: Request, res: Response) => {
  try {
    const { timeWindow } = req.params; // can only be week or day
    const result = requestTMDB(
      `https://api.themoviedb.org/3/trending/movie/${timeWindow}`
    );
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches details of a movie
export const getMovieDetails = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req.params;
    const result = requestTMDB(
      `https://api.themoviedb.org/3/movie/${movie_id}`
    );
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches trailer of a movie by giving its youtube id
export const getMovieTrailer = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req.params;
    const result = requestTMDB(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos`
    );
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches similar movies
export const getSimilarMovies = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req.params;
    const result = requestTMDB(
      `https://api.themoviedb.org/3/movie/${movie_id}/similar`
    );
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches images of a movie
export const getMovieImages = async (req: Request, res: Response) => {
  try {
    const { movie_id } = req.params;
    const result = requestTMDB(
      `https://api.themoviedb.org/3/movie/${movie_id}/images`
    );
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches up to date list of the officially supported movie certifications on TMDB.
export const getMovieCertifications = async (req: Request, res: Response) => {
  try {
    const result = requestTMDB(
      "https://api.themoviedb.org/3/certification/movie/list"
    );
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches list of movies that are currently in theatres
export const getNowPlayingMovies = async (req: Request, res: Response) => {
  try {
    const result = requestTMDB(
      "https://api.themoviedb.org/3/movie/now_playing"
    );
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches list of movies ordered by popularity
export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const result = requestTMDB("https://api.themoviedb.org/3/movie/popular");
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches list of top rated movies
export const getTopRatedMovies = async (req: Request, res: Response) => {
  try {
    const result = requestTMDB("https://api.themoviedb.org/3/movie/top_rated");
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// fetches list of movies that are being released soon
export const getUpcomingMovies = async (req: Request, res: Response) => {
  try {
    const result = requestTMDB("https://api.themoviedb.org/3/movie/upcoming");
    return res.status(200).json({ success: true, content: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
