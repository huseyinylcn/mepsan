const path = require("path")
const fs = require("fs")
const os = require("os")

async function fileContentsUseCase(data) {

    try {
       
        const dataDir = path.join(os.tmpdir(), 'data');
        const filePath = path.join(dataDir, data.fileName);
        return { content: fs.readFileSync(filePath, 'utf-8') };

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = fileContentsUseCase