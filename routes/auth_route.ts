import { Router } from "express";
import {
  authCheck,
  logOut,
  refreshTokenController,
  signIn,
  signUp,
} from "../controllers/auth_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const router: Router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/logout", authMiddleware, logOut);
router.post("/refresh", refreshTokenController);

router.get("/check", authMiddleware, authCheck);

export default router;