const router = require("express").Router()
const controller = require("./controller")



router.post("/v1/get/",  controller.pumpsGet)








module.exports = router