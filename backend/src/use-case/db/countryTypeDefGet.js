


async function countryTypeDefGet(data,{db_models}) {
    try {
        let result = await db_models.countryTypeDefGet(data)
        return result;

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = countryTypeDefGet