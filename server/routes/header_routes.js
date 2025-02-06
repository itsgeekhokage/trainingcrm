import express from "express"
import { validateHeaderData } from "../middlewares/validators.js";
import { createHeader, getAllHeaders, getPdfConfirmation, getProjectHeaders, getVideoConfirmation, inactivateHeader} from "../controllers/header_controller.js";

const router = express.Router();

router.get("/inactivate/:header_code", inactivateHeader);
router.get("/video-confirmation/:header_code", getVideoConfirmation);
router.get("/pdf-confirmation/:header_code", getPdfConfirmation);
router.get("/:project_code/:training_type", getProjectHeaders);
router.get("/", getAllHeaders);
router.post("/", validateHeaderData, createHeader);

export default router;