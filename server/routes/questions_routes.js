import express from 'express';
import { validateQuestionsData } from '../middlewares/validators.js';
import { createQuestions, deleteQuestion, getAllQuestions, getQuestions } from '../controllers/questions_controller.js';

const router = express.Router()

router.post("", validateQuestionsData, createQuestions);
router.post("/get", getQuestions);
router.get("/", getAllQuestions);
router.delete("/:question_code", deleteQuestion);

export default router;