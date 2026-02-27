const pumpsGetUseCase =  require("./../../../use-case/pump/pumpsGet")


async function pumpsGet(req,res,next) {
    try {
        let data =  await pumpsGetUseCase(req.body)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(400).json({err:err.message})
    }
}




module.exports = { pumpsGet }