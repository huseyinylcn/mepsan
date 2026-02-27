const router = require("express").Router()
const controller = require("./controller")
const multer = require('multer');
const upload = multer();


router.post("/v1/encryptor",       controller.encryptor)
router.post("/v1/decrypt",   upload.single('file'),controller.decrypt)
router.post("/v1/file-names",     controller.fileNames)
router.post("/v1/file-content",   controller.fileContents)







module.exports = router