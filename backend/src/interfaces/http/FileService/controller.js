const encryptorUseCase = require("../../../use-case/FileService/encryptor")
const decryptUseCase = require("../../../use-case/FileService/decrypt")
const fileNamesUseCase = require("../../../use-case/FileService/fileNames")
const fileContentsUseCase = require("../../../use-case/FileService/fileContents")






async function encryptor(req, res, next) {
    try {
        const result = await encryptorUseCase(req.body);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${result.fileName}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        res.status(200).send(result.fileData)
    } catch (err) {
        res.status(400).json({ err: err })
    }

}

async function decrypt(req, res, next) {
    try {
        const result = await decryptUseCase(req.file.buffer, req.file.originalname);
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err })
    }

}

async function fileNames(req, res, next) {
    try {
        const result = await fileNamesUseCase(req.body);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ err: err })
    }

}

async function fileContents(req, res, next) {
    try {
        const result = await fileContentsUseCase(req.body);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ err: err })
    }

}





module.exports = { encryptor, decrypt, fileNames, fileContents }