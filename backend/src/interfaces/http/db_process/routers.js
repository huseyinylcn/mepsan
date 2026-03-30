const router = require("express").Router();
const controller =  require("./controller")




router.post("/v1/get/dynamic", controller.dynamicGetModel)
router.post("/v1/update/dynamic", controller.dynamicUpdateModel)



module.exports = router