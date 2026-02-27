const path = require("path")
const fs = require("fs")
const os = require("os")

async function foldersNameUseCase(data) {

    try {
        const dataDir = path.join(os.tmpdir(), 'data');

        const files = fs.readdirSync(dataDir);


        

        return files;

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = foldersNameUseCase