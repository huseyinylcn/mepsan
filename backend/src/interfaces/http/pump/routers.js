const router = require("express").Router()
const controller = require("./controller")
const jwtService = require("./../../../infrastructure/jwt/jwtService")




router.post("/v1/get/", jwtService.authenticateToken,  controller.pumpsGet)








module.exports = router