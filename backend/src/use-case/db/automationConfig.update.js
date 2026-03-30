async function automationConfigUpdate(data,{db_models}) {
    try {
        let result = await db_models.automationConfigUpdate(data)
        return result;

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = automationConfigUpdate