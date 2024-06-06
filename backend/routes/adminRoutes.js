import express from "express";
import {
  addPincode,
  createMealPlan,
  createWeaklyMenu,
  getAllUsers,
  getOrdersByEmail,
  getOverallItemsAndQuantities,
  googleAuth,
  googleCallback,
  googleProfile,
  cloverAuth,
  cloverCallback,
  cloverProfile,
} from "../controllers/adminController.js";
import { createMeal } from "../controllers/adminController.js";

const router = express.Router();

router.route("/addPincode").post(addPincode);
router.route("/new-Thali").post(createMeal);
router.route("/new-mealPlan").post(createMealPlan);
router.route("/weekly-menu").post(createWeaklyMenu);
router.route("/orders").get(getOverallItemsAndQuantities);
router.route("/user-details").get(getAllUsers);
router.route("/user-orders/:email").get(getOrdersByEmail);

//google o auth
router.get("/google/auth", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/google/profile", googleProfile);

// Clover OAuth Routes
router.get("/clover/auth", cloverAuth);
router.get("/clover/callback", cloverCallback);
router.get("/clover/profile", cloverProfile);

export default router;
