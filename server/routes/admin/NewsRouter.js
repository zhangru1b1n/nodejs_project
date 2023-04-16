var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');

const multer  = require('multer')
const upload = multer({ dest: 'public/newsUploads/' })
var router = express.Router();
router.post("/adminapi/news/add",upload.single('file'),NewsController.add)
router.get("/adminapi/news/list",NewsController.getList)
router.post("/adminapi/news/list",NewsController.publishNews)
router.delete("/adminapi/news/list/:id",NewsController.deleteNews)
router.put("/adminapi/news/list/:id",NewsController.getNews)
router.post("/adminapi/news/update",upload.single('file'),NewsController.update)


module.exports = router;