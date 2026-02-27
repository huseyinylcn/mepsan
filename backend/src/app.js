const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());



const FileService = require("./interfaces/http/FileService/routers")
const pumpService = require("./interfaces/http/pump/routers")





app.use("/api/files",FileService)
app.use("/api/pumps",pumpService)







module.exports = app