const automationConfigGetUseCase = require("../../../use-case/db/automationConfig.get")
const automationProtocolsGetUseCase = require("../../../use-case/db/automationProtocols.get")
const automationConfigUpdateUseCase = require("../../../use-case/db/automationConfig.update")
const automationProtocolsUpdateUseCase = require("../../../use-case/db/automationProtocols.update")
const countryTypeDefGetUseCase = require("../../../use-case/db/countryTypeDef.get")
const countryTypeDefUpdateUseCase = require("../../../use-case/db/countryTypeDef.update")


const dispenserConfigGetUseCase = require("../../../use-case/db/dispenserConfig.get")
const dispenserConfigUpdateUseCase = require("../../../use-case/db/dispenserConfig.update")

const dispenserNozzlesGetUseCase = require("../../../use-case/db/dispenserNozzles.get")
const dispenserNozzlesUpdateUseCase = require("../../../use-case/db/dispenserNozzles.update")





const db_models = require("./../../../infrastructure/db/models")



exports.automationConfigUpdate = async (req,res,next)=> {
    try {
        let result = await automationConfigUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
}


exports.automationConfigGet = async(req,res,next) => {
    try {
        let result = await automationConfigGetUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
}


exports.automationProtocolsUpdate  = async(req,res,next) => {
    try {
        let result =  await automationProtocolsUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
        
    } catch (err) {
        req.status(400).json({err:err})
    }
}


exports.automationProtocolsGet =  async (req,res,next) =>{
    try {
        let result =  await automationProtocolsGetUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
        
    } catch (err) {
        req.status(400).json({err:err})
    }
}

exports.countryTypeDefGet = async (req,res,next) =>{

    try {

        let result = await countryTypeDefGetUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
        
    } catch (err) {
        res.status(400).json({err:err})
    }
}

exports.countryTypeDefUpdate = async (req,res, next) => {
    try {
        

        let result = await countryTypeDefUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true, result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
}


exports.dispenserConfigGet = async (req,res,next) => {
    try {
        let result = await dispenserConfigGetUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
    
}


exports.dispenserConfigUpdate = async (req,res,next)=> {
    try {

        let result = await dispenserConfigUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
        
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
}



exports.dispenserNozzlesGet = async (req,res,next) => {
    try {
        let result = await dispenserNozzlesGetUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
    
}



exports.dispenserNozzlesUpdate = async (req,res,next) => {
    try {
        let result = await dispenserNozzlesUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
    
}








exports.dispenserProtocolsGet = async (req,res,next) => {
    try {
        let result = await dispenserNozzlesGetUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
    
}



exports.dispenserProtocolsUpdate = async (req,res,next) => {
    try {
        let result = await dispenserNozzlesUpdateUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        res.status(400).json({err:err})
    }
    
}

// --------------------------------------------------------------------------





