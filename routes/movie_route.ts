import { Router } from "express";
import {
  getTrendingMovie,
  getMovieDetails,
  getSimilarMovies,
  getMovieImages,
  getMovieCertifications,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieTrailer,
} from "../controllers/movie_controller";

const router: Router = Router();

router.get("/trending/:timeWindow", getTrendingMovie);
router.get("/:movie_id", getMovieDetails);
router.get("/:movie_id", getMovieTrailer);
router.get("/:movie_id/similar", getSimilarMovies);
router.get("/:movie_id/images", getMovieImages);
router.get("/certifications/list/all", getMovieCertifications);
router.get("/list/now_playing", getNowPlayingMovies);
router.get("/list/popular", getPopularMovies);
router.get("/list/top_rated", getTopRatedMovies);
router.get("/list/upcoming", getUpcomingMovies);

export default router;