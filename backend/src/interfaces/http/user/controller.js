const jwtService = require("./../../../infrastructure/jwt/jwtService")
const signupUseCase = require("./../../../use-case/user/signup")
const loginUseCase = require("./../../../use-case/user/login")
const GetAllUseCase = require("./../../../use-case/user/GetAll")
const updateUseCase = require("./../../../use-case/user/update")
const userDeleteUseCase = require("./../../../use-case/user/userDelete")
const meUseCase = require("./../../../use-case/user/me")




const db_models = require("./../../../infrastructure/db/models")




exports.login = async (req, res) => {
    try {
        let result = await loginUseCase(req.body, { db_models, jwtService })


        res.cookie('token', result.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000
        });

        res.status(200).json({ status: true, result: result })


    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error.message })
    }
}


exports.signup = async (req, res)=> {
    try {
        let result = await signupUseCase(req.body, { db_models })
        res.status(200).json({ status: true, result: result })


    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error })
    }
}


exports.GetAll = async (req, res) => {
    try {


      
        let result = await GetAllUseCase(req.body, { db_models })
        res.status(200).json({ status: true, result: result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error })
    }
}



exports.update = async (req, res) => {
    try {


        
        let result = await updateUseCase(req.body, { db_models })

        res.status(200).json({ status: true, result: result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error })
    }
}







exports.Userdelete = async (req, res) => {
    try {


        // let permission = ["1"]
        // if (!permission.includes(String(req.user.Type))) {
        //     return res.status(403).json({ message: "Bu işlem için yetkiniz yok." });
        // }
        let result = await userDeleteUseCase(req.body, { db_models })

        res.status(200).json({ status: true, result: result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error })
    }
}



exports.me = async(req, res) => {
    try {

        req.body = req.user

        let result = await meUseCase(req.body, { db_models })
        res.status(200).json({ status: true, result: result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error })
    }
}


exports.logout = (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.status(200).json({ status: true, message: "Başarıyla çıkış yapıldı" });

    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error })
    }
}



