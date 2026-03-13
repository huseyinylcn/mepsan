
async function automationProtocolsGet(data,{db_models}) {

    try {
        let result = await db_models.automationProtocolsGet(data)
        return result;

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = automationProtocolsGet