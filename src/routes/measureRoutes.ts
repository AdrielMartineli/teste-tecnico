import { Router } from 'express';
import { uploadMeasure, confirmMeasureValue, listCustomerMeasuresHandler } from '../controllers/measureController';

const router = Router();

router.post('/upload', uploadMeasure);
router.patch('/confirm', confirmMeasureValue);
router.get('/:customer_code/list', listCustomerMeasuresHandler);

export default router;
