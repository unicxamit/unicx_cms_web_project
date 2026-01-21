import express from "express";
import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq, updateFaqStatus } from "../controllers/faqController.js";
import isAuthenticated, { isAdmin } from "../middleware/isauthenticated.js";

const router =express.Router();

router.post("/create-faq",createFaq);
router.get("/getAllFaq",getAllFaqs);
router.get("/getFaq/:id",getFaqById);
router.put("/update-faq/:id",updateFaq);
router.delete("/delete-Faq/:id",deleteFaq);
router.patch("/update-status/:id", updateFaqStatus);

export default router;