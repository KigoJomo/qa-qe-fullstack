import { deleteUser, getUser, listUsers, updateUser } from "@app/controllers/userController";
import { authenticate, authorize } from "@app/middleware/auth";
import { Router } from "express";

const router = Router()

router.get("/", authenticate, authorize([1]), listUsers);
router.get("/:user_id", authenticate, authorize([1]), getUser);
router.put("/:user_id", authenticate, authorize([1]), updateUser);
router.delete("/:user_id", authenticate, authorize([1]), deleteUser);

export default router;