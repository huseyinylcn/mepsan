async function loginUseCase(data,{db_models, jwtService}) {

    let result = await  db_models.login(data)
    if(result){
        result.token = jwtService.generateToken(result)
        return result
    }

    

    return result
}




module.exports = loginUseCase