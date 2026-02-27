const unzipper = require("unzipper");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os")
const { Readable } = require("stream");


async function decryptUseCase(fileBuffer, fileName) {
    return new Promise((resolve, reject) => {
        try {


            let tmpFolderName = "data"
            const tmpDir = os.tmpdir();
            const extractPath = path.join(tmpDir, tmpFolderName);
            const algorithm = 'aes-128-cbc';

            if (fs.existsSync(extractPath)) {
                fs.rmSync(extractPath, { recursive: true, force: true });
            }
            fs.mkdirSync(extractPath, { recursive: true });
            if (fileBuffer.length < 16) return reject(new Error("Dosya çok kısa, IV eksik!"));

            const iv = fileBuffer.slice(0, 16); 
            const encryptedData = fileBuffer.slice(16);



            const keyHex = fileName.replace('.zip.enc', '');
            const key = Buffer.from(keyHex, 'hex')

            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            const readStream = Readable.from(encryptedData);




            readStream
                .pipe(decipher)
                .pipe(unzipper.Extract({ path: extractPath }))
                .on('close', () => {
                    resolve(true);
                })
                .on('error', (err) => {
                    reject(err);
                });

            decipher.on('error', (err) => {
                reject(err);
            });

        } catch (error) {
            console.log(error)
            reject(error)
        }


    });
}


module.exports = decryptUseCase