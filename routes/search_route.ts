import { Router } from "express";
import {
  searchForCollections,
  searchForMovies,
  searchForMultipleRequests,
  searchForPerson,
  searchForTV,
} from "../controllers/search_controller";

const router: Router = Router();

router.get("/collection/:query", searchForCollections);
router.get("/movie/:query", searchForMovies);
router.get("/multi/:query", searchForMultipleRequests);
router.get("/person/:query", searchForPerson);
router.get("/tv/:query", searchForTV);

export default router;