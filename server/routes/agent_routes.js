import express from "express"
import { validateAgentsData } from "../middlewares/validators.js";
import { createAgent, getAgent, getAllagents } from "../controllers/agent_controller.js";

const router = express.Router();

router.get("/", getAllagents);
router.post("/auth", getAgent);
router.post("/", validateAgentsData, createAgent);

export default router;