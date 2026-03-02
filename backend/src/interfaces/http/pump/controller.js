const pumpsGetUseCase = require("./../../../use-case/pump/pumpsGet")


async function pumpsGet(req, res, next) {
    try {
        console.log(req.user.Type)
        let permission = ["1", "2"]
        if (!permission.includes(String(req.user.Type))) {
            return res.status(403).json({ message: "Bu işlem için yetkiniz yok." });
        }

        let data = await pumpsGetUseCase(req.body)
        
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(400).json({ err: err.message })
    }
}


module.exports = { pumpsGet }