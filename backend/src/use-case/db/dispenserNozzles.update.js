async function dispenserNozzlesUpdate(data,{db_models}) {
    let result = await db_models.dispenserNozzlesUpdate(data)
    return result
    
}



module.exports = dispenserNozzlesUpdate