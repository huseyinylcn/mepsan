async function dispenserConfigGet(data,{db_models}) {
    let result = await db_models.dispenserConfigGet(data)
    return result;
}


module.exports = dispenserConfigGet