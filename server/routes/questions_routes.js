import express from 'express';
import { validateQuestionsData } from '../middlewares/validators.js';
import { createQuestions, getAllQuestions, getQuestions } from '../controllers/questions_controller.js';

const router = express.Router()

router.post("", validateQuestionsData, createQuestions);
router.post("/get", getQuestions);
router.get("/", getAllQuestions);
export default router;