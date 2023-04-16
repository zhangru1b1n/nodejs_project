var express = require('express');
const NewsController = require('../../controllers/web/NewsController');

var router = express.Router();
router.get("/webapi/news/list",NewsController.getList)
router.get("/webapi/news/getNews/:id",NewsController.getNews)
router.get("/webapi/news/topList",NewsController.getTopNews)


module.exports = router;