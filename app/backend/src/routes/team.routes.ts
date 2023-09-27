import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('oi'));

export default router;
