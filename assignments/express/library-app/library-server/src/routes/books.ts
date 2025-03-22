import { addBook, deleteBook, getBooks, updateBook } from "@app/controllers/bookController";
import { authenticate, authorize } from "@app/middleware/auth";
import { Router } from "express";

const router = Router();

router.get('/', getBooks)

router.post('/', authenticate, authorize([1]), addBook)
router.put('/:book_id', authenticate, authorize([1]), updateBook)
router.delete('/:book_id', authenticate, authorize([1]), deleteBook)

export default router;