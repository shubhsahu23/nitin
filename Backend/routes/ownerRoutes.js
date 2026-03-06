const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addPropertyController, getAllOwnerPropertiesController, handleAllBookingstatusController, deletePropertyController, updatePropertyController, getAllBookingsController } = require("../controllers/ownerController");


const router = express.Router();
const uploadsDir = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Render instances can start without this directory; create it on-demand.
    fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const sanitizedName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${timestamp}-${sanitizedName}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/postproperty",
  upload.array("propertyImages"),
  authMiddleware,
  addPropertyController
);

router.get("/getallproperties", authMiddleware, getAllOwnerPropertiesController);

router.get("/getallbookings", authMiddleware, getAllBookingsController);

router.post("/handlebookingstatus", authMiddleware, handleAllBookingstatusController);

router.delete(
  "/deleteproperty/:propertyid",
  authMiddleware,
  deletePropertyController
);

router.patch(
  "/updateproperty/:propertyid",
  upload.single("propertyImage"),
  authMiddleware,
  updatePropertyController
);

module.exports = router;
