async function automationProtocolsUpdate(data,{db_models}) {
    try {
        let result = await db_models.automationProtocolsUpdate(data)
        return result;

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = automationProtocolsUpdate