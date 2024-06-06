import express from "express";
import { pincodeVerification } from "../controllers/pincodeController.js";

const router = express.Router();

router.route("/pincodeVerify").post(pincodeVerification);

export default router;
