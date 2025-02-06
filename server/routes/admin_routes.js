import express from "express"
import { getAdmin } from "../controllers/admin_controller.js";

const router = express.Router();

router.post("/auth", getAdmin);

export default router;