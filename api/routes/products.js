const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Does not correct mime type"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});


router.get("/", productController.getAllProducts);

router.post("/", upload.single('productImage'), productController.createProducts);

router.get("/:productId", productController.getProduct);

router.patch("/:productId", productController.updateProduct);

router.delete("/:productId", productController.deleteProduct);

module.exports = router;