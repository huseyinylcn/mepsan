const jwtService = require("./../../../infrastructure/jwt/jwtService")
const  signupUseCase = require("./../../../use-case/user/signup")
const  loginUseCase = require("./../../../use-case/user/login")
const bcrypt = require('bcrypt');
const  db_models = require("./../../../infrastructure/db/models")




async function login(req,res) {
    try {
        let result = await loginUseCase(req.body, {db_models, jwtService})
        res.status(200).json({status:true, result:result})
        
        
    } catch (error) {
        console.log(error)
        res.status(400).json({err:error.message})
    }
}


async function signup(req,res) {
    try {
        let result = await signupUseCase(req.body,{db_models})
        res.status(200).json({status:true,result:result})
        
        
    } catch (error) {
        console.log(error)
        res.status(400).json({err:error})
    }
}


module.exports = {login, signup}