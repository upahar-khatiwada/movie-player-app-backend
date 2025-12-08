import { Router } from "express";
import { logOut, signIn, signUp } from "../controllers/auth_controller";

const router: Router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/logout", logOut);

export default router;