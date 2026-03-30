async function dispenserNozzlesGet(data,{db_models}) {
    let result = await db_models.dispenserNozzlesGet(data)
    return result
    
}



module.exports = dispenserNozzlesGet