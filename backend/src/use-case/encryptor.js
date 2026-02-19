const archiver = require("archiver");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os")



async function encryptorUseCase(data) {
    return new Promise((resolve, reject) => {
        try {

            
            let tmpFolderName = "data"
            const algorithm = 'aes-128-cbc';
            const password = crypto.randomBytes(16);
            const iv = crypto.randomBytes(16);
            const folderName = path.join(os.tmpdir(), tmpFolderName);

            
     
            const archive = archiver('zip', { zlib: { level: 9 } });
            const cipher = crypto.createCipheriv(algorithm, password, iv);

            let chunks = [];
            chunks.push(iv);

            cipher.on('data', (chunk) => chunks.push(chunk));

            cipher.on('end', () => {
                const resultBuffer = Buffer.concat(chunks);
                resolve({
                    fileData: resultBuffer,
                    fileName: `${password.toString("hex")}.zip.enc`,
                    password: password.toString("hex")
                });
            });
        

            archive.on('error', (err) => reject(err));
            cipher.on('error', (err) => reject(err));

            archive.pipe(cipher);

            archive.directory(folderName, false);
            archive.finalize();





        } catch (error) {
            console.log(error)
            reject(error)
        }


    });
}


module.exports = encryptorUseCase