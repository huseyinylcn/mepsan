const router = require("express").Router()
const controller = require("./controller")
const multer = require('multer');
const upload = multer();


router.post("/encryptor",       controller.encryptor)
router.post("/decrypt",   upload.single('file'),      controller.decrypt)
router.post("/file-names",     controller.fileNames)
router.post("/file-content",   controller.fileContents)







module.exports = router