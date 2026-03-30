
async function automationConfigGet(data,{db_models}) {

    try {
        let result = await db_models.automationConfigGet(data)
        return result;

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = automationConfigGet