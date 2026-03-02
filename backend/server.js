const app = require("./src/app")
const { getDbConnection } = require("./src/config/database")


const PORT = process.env.PORT || 3001

async function startServer() {
    try {
        await getDbConnection()
        console.log("Veri Tabanına Bağlanıldı")
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`)
        })

    } catch (error) {
        console.error(`Server Error: ${error}`)
    }




}

startServer()





