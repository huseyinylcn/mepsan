



async function GetAll(data,{db_models}) {
    let result = await db_models.usersGetAll(data)
    return result
}


module.exports = GetAll