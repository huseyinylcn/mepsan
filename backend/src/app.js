const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());



const routers = require("./interfaces/http/routers")




app.use("/api/",routers)






module.exports = app