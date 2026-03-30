


async function countryTypeDefUpdate(data,{db_models}) {
    try {
        let result = await db_models.countryTypeDefUpdate(data)
        return result;

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = countryTypeDefUpdate