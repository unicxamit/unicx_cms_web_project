import express from "express";
import {
  createServiceDetail,
  deleteServiceDetails,
  getAllServiceDetails,
  getServiceDetailsById,
  getServiceDetailsByService,
  updateServiceDetail,
} from "../controllers/serviceDetailController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create-service-details",upload.array("images", 5),createServiceDetail);
router.get("/getAllService_details", getAllServiceDetails);
router.get("/getService_detailsById/:id", getServiceDetailsById);
router.put(
  "/updateService_detailsById/:serviceId",
upload.array("images", 5),
  updateServiceDetail
);
router.delete("/deleteService_detailsById/:id", deleteServiceDetails);
router.get("/by-service/:serviceId", getServiceDetailsByService);

export default router;
