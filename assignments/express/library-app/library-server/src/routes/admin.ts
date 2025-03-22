import { authenticate, authorizeWithRedirect } from '@app/middleware/auth';
import { Router } from 'express';
import path from 'path';

const router = Router();

// router.get('/', authenticate, authorizeWithRedirect([1]), (req, res) => {
//   res.sendFile(path.join(__dirname, '../../../frontend/admin.html'));
// });

export default router;
