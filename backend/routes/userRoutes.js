import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  getUserInfo,
  loginUser,
  logout,
  registerUser,
  updateUserInfo,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/user-info").get(isAuthenticatedUser, getUserInfo);
router.put("/user-update", isAuthenticatedUser, updateUserInfo);
router.route("/address").post(isAuthenticatedUser, addAddress);
router.route("/address/:addressId").put(isAuthenticatedUser, editAddress);
router.route("/address/:addressId").delete(isAuthenticatedUser, deleteAddress);
router.get("/check-auth", isAuthenticatedUser, (req, res) => {
  res.json({ isAuthenticated: true });
});

export default router;
