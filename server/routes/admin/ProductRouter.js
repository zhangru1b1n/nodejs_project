var express = require('express');
const ProductController = require('../../controllers/admin/ProductController');

const multer  = require('multer')
const upload = multer({ dest: 'public/productUploads/' })
var router = express.Router();
router.post("/adminapi/product/add",upload.single('file'),ProductController.add)
router.get("/adminapi/product/list",ProductController.getList)
router.delete("/adminapi/product/list/:id",ProductController.deleteList)
router.put("/adminapi/product/list/:id",ProductController.getProduct)
router.post("/adminapi/product/update",upload.single('file'),ProductController.updateProduct)


module.exports = router;