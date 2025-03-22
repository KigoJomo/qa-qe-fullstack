import { issueBook } from "@app/controllers/borrowingsController";
import { authenticate, authorize, authorizeWithRedirect } from "@app/middleware/auth";
import { Router } from "express";
import path from "path";

const router = Router()

router.get('/', authenticate, authorizeWithRedirect([2]), (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/borrow.html'));
})
router.post("/", authenticate, authorize([2]), issueBook)

export default router