const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({
  origin: 'https://34e5-78-188-72-174.ngrok-free.app/', 
  credentials: true 
}));
app.use(cookieParser()); 


const FileService = require("./interfaces/http/FileService/routers")
const pumpService = require("./interfaces/http/pump/routers")
const userService = require("./interfaces/http/user/routers")






app.use("/api/files",FileService)
app.use("/api/pumps",pumpService)
app.use("/api/user",userService)








module.exports = app