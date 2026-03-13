const router = require("express").Router();
const controller =  require("./controller")




router.post("/v1/update/automation-config", controller.automationConfigUpdate)
router.post("/v1/get/automation-config", controller.automationConfigGet)


router.post("/v1/update/automation-protocols", controller.automationProtocolsUpdate)
router.post("/v1/get/automation-protocols", controller.automationProtocolsGet)


router.post("/v1/get/country-type-def", controller.countryTypeDefGet)
router.post("/v1/update/country-type-def", controller.countryTypeDefUpdate)




router.post("/v1/get/dispencer-config", controller.dispenserConfigGet)
router.post("/v1/update/dispencer-config", controller.dispenserConfigUpdate)

router.post("/v1/get/dispencer-config", controller.dispenserConfigGet)
router.post("/v1/update/dispencer-config", controller.dispenserConfigUpdate)







module.exports = router