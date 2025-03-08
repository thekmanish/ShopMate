import express from "express";
const router = express.Router();
import {
  authUser,
  logout,
  register,
  updateProfile,
  deleteAccount,
  checkAuth,
} from "../controller/userController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";
router
  .route("/")
  .post(authUser)
  .put(protect, updateProfile)
  .delete(protect, deleteAccount)
  .get(checkAuth);
router.post("/signup", register);
router.get("/logout", logout);
export default router;
