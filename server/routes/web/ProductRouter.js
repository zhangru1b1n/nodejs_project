var express = require('express');
const ProductController = require('../../controllers/web/ProductController');

var router = express.Router();
router.get("/webapi/product/list",ProductController.getList)


module.exports = router;