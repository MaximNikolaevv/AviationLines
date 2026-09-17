import { Router } from "express";
import Controllers from "../Controllers/controllers.js";
import AuthControllers from "../Controllers/authControllers.js";

const router = Router();

router.use("/info", Controllers);
router.use("api", AuthControllers);

export default router;
