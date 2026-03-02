const router = require("express").Router()
const controller = require("./controller")




router.post("/v1/post/signup",  controller.signup)
router.post("/v1/post/login", controller.login)





module.exports = router