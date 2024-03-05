import {Router} from "express";
import filloutRoutes from "./filloutRoutes";

const router = Router();

router.use("", filloutRoutes)

export default router;
