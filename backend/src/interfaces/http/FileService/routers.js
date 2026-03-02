const router = require("express").Router()
const controller = require("./controller")
const multer = require('multer');
const upload = multer();
const jwtService = require("./../../../infrastructure/jwt/jwtService")

router.post("/v1/encryptor", jwtService.authenticateToken,       controller.encryptor)
router.post("/v1/decrypt",jwtService.authenticateToken,   upload.single('file'),controller.decrypt)
router.post("/v1/file-names",jwtService.authenticateToken,     controller.fileNames)
router.post("/v1/file-content",jwtService.authenticateToken,   controller.fileContents)







module.exports = router