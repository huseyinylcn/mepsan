

const {dynamicGetModel} = require("../../../use-case/db/dynamicGetModel")
const {dynamicUpdateModel} = require("../../../use-case/db/dynamicUpdateModel ")








const db_models = require("./../../../infrastructure/db/models")




exports.dynamicGetModel = async (req,res,next) => {
    try {
        let result = await dynamicGetModel(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
    
}


exports.dynamicUpdateModel = async (req,res,next) => {
    try {
        let result = await dynamicUpdateModel(req.body,{db_models})
        res.status(200).json({status:true,result:result})
    } catch (err) {
        console.log(err)
        res.status(400).json({err:err})
    }
    
}




