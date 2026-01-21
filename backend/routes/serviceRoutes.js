import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  getServicesByCategory,
//   getServicesBySubCategory,
  updateService,
  deleteService,
  updateServiceyStatus,
  getServicesBysubCategory,
  updateServiceOrder,
} from "../controllers/serviceController.js";
import isAuthenticated, { isAdmin } from "../middleware/isauthenticated.js";

const router = express.Router();

router.post("/add-service", createService);
router.get("/getAllServices", getAllServices);
router.get("/getserviceById/:id", getServiceById);
router.get("/serviceBy/category/:categoryId", getServicesByCategory);
// router.get("/subcategory/:subCategoryId", getServicesBySubCategory);
router.get("/getservice/:subcategoryId", getServicesBysubCategory);
router.put("/update-service/:id", updateService);
router.delete("/delete-service/:id", deleteService);
router.patch("/update-status/:id", updateServiceyStatus);
router.put("/reorder/service", updateServiceOrder);

export default router;
