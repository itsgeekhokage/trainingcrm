import express from 'express';
import { createTest, getTests } from '../controllers/test_controller.js';

const router = express.Router();


router.get('/:agent_mobile', getTests);
router.post('/', createTest);

export default router;