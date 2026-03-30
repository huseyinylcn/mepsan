exports.dynamicGetModel = async (data, { db_models }) => {


    let result = await db_models.dynamicGetModel(data)
    return result;
}
