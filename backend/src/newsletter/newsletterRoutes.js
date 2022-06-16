import express from 'express';
import { newsletterController } from './newsletterController';

const router = express.Router();

router.post('/newsletter', newsletterController.addNew);

export default router;
