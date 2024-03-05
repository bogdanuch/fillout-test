import express from "express";
import {getFormData} from "../controllers";
const authRouter = express.Router();

authRouter.route("/:formId/filteredResponses").get(getFormData);

export default authRouter;
