async function signupUseCase(data,{db_models}) {
    
 

    let result = await db_models.signup(data)

 
    return result
    
}


module.exports = signupUseCase