


async function dispenserConfigUpdate(data,{db_models}) {
    let result = await db_models.dispenserConfigUpdate(data)
    return result
    
}



module.exports = dispenserConfigUpdate