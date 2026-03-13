const automationConfigGetUseCase = require("./../../../use-case/db/automationConfigGet")
const automationProtocolsGetUseCase = require("./../../../use-case/db/automationProtocolsGet")
const automationConfigUpdateUseCase = require("./../../../use-case/db/automationConfigUpdate")
const automationProtocolsUpdateUseCase = require("./../../../use-case/db/automationProtocolsUpdate")
const countryTypeDefGetUseCase = require("./../../../use-case/db/countryTypeDefGet")
const countryTypeDefUpdateUseCase = require("./../../../use-case/db/countryTypeDefUpdate")


const dispenserConfigGetUseCase = require("./../../../use-case/db/dispenserConfigGet")
const dispenserConfigUpdateUseCase = require("./../../../use-case/db/dispenserConfigUpdate")







const db_models = require("./../../../infrastructure/db/models")



async function automationConfigUpdate(req,res,next) {
    try {
        let result = await automationConfigUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
}


async function automationConfigGet(req,res,next) {
    try {
        let result = await automationConfigGetUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
}


async function automationProtocolsUpdate(req,res,next) {
    try {
        let result =  await automationProtocolsUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
        
    } catch (err) {
        req.status(400).json({err:err})
    }
}


async function automationProtocolsGet(req,res,next) {
    try {
        let result =  await automationProtocolsGetUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
        
    } catch (err) {
        req.status(400).json({err:err})
    }
}



async function countryTypeDefGet(req,res,next){

    try {

        let result = await countryTypeDefGetUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
        
    } catch (err) {
        res.status(400).json({err:err})
    }
}

async function countryTypeDefUpdate(req,res, next) {
    try {
        

        let result = await countryTypeDefUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
}


async function dispenserConfigGet(req,res,next) {
    try {
        let result = await dispenserConfigGetUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
    
}


async function dispenserConfigUpdate(req,res,next) {
    try {

        let result = await dispenserConfigUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
        
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
}


module.exports = {automationConfigUpdate,automationConfigGet,automationProtocolsGet,automationProtocolsUpdate, countryTypeDefGet, countryTypeDefUpdate, dispenserConfigGet,dispenserConfigUpdate}