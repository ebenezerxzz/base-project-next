import express from "express";
import { authMiddleware } from "../../Auth/auth_middleware";
import { getUsers, protectedRouter, registerUser, loginUser} from "../controllers/user_controllers";

const router = express.Router();

router.get("/get", getUsers);
router.get("/protected", authMiddleware, protectedRouter);
router.post("/loginuser", loginUser);
router.post("/registerUser", registerUser);

export default router;