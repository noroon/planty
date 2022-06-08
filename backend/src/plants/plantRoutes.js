import express from 'express';
// import { api } from '../routes';
import { plantController } from './plantController';

const router = express.Router();

router.get('/plants', plantController.get);

router.post('/admin/new-plant', plantController.addNew);
// router.post('/admin/news', articleController.addNew);

export default router;
