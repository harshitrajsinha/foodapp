import express from "express";
import {
  getAllFood,
  getMainMenu,
  getMealPlan,
  getModification,
  getThaliCategories,
  getThaliContent,
  getWeeklyMenu,
  markModification,
  orderDetails,
  placeOrder,
} from "../controllers/foodController.js";

const router = express.Router();

router.route("/food").get(getAllFood);
router.route("/thali-categories").get(getThaliCategories);
router.route("/weekly-menu").get(getWeeklyMenu);
router.route("/thali-content/:name").get(getThaliContent);
router.route("/thali-details/:name/:days/:startDate?").get(getMainMenu);
//router.route("/thali-details/:name/:days").get(getMainMenu);
router.route("/placeOrder/:orderId?").post(placeOrder);
router.route("/modify-order").get(orderDetails);
router.route("/mealPlan").get(getMealPlan);
router.route("/mark-modification").post(markModification);
router.route("/get-modification-counter/:orderId").get(getModification);

export default router;
