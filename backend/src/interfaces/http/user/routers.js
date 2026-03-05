const router = require("express").Router()
const controller = require("./controller")
const jwtService = require("./../../../infrastructure/jwt/jwtService")




router.post("/v1/post/signup",  controller.signup)
router.post("/v1/post/login", controller.login)

router.get("/v1/get/all",jwtService.authenticateToken,  controller.GetAll)
router.post("/v1/update",jwtService.authenticateToken,  controller.update)
router.delete("/v1/delete",jwtService.authenticateToken,  controller.Userdelete)
router.post("/v1/me",jwtService.authenticateToken,  controller.me)
router.post("/v1/logout",jwtService.authenticateToken,  controller.logout)







module.exports = router