async function update(data,{ db_models }) {
    let result =  await db_models.userUpdate(data);
    return result
}


module.exports = update