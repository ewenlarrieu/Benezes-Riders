import express from "express";
import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/StripeController.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.get("/verify-payment/:sessionId", verifyPayment);

export default router;
