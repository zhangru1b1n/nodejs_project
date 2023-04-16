var express = require('express');
const UserController = require('../../controllers/admin/UserController');

const multer  = require('multer')
const upload = multer({ dest: 'public/avaterUploads/' })
var router = express.Router();
router.post("/adminapi/user/login",UserController.login)
router.post("/adminapi/user/upload",upload.single('file'),UserController.upload)
router.post("/adminapi/user/add",upload.single('file'),UserController.add)
router.get("/adminapi/user/list",UserController.getList)
router.delete("/adminapi/user/list/:id",UserController.delList)
router.post("/adminapi/user/list",UserController.changeUser)


module.exports = router;