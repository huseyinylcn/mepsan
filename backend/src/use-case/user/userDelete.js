async function userDelete(data,{ db_models }) {
    let result =  await db_models.userDelete(data);
    return result
}


module.exports = userDelete