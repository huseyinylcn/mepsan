exports.dynamicUpdateModel = async (data, { db_models }) => {


    let result = await db_models.dynamicUpdateModel(data)
    return result;
}
