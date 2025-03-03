import express from 'express';
import { createTest, getTestByMobileNumberAndHeaderCode, getTests } from '../controllers/test_controller.js';

const router = express.Router();


router.get('/:agent_mobile', getTests);
router.get('/:mobile_number/:header_code', getTestByMobileNumberAndHeaderCode);
router.post('/', createTest);

export default router;