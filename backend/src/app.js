const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))


const allowedOrigins = [
  'http://localhost:3002', 
  'https://49f3-78-188-72-174.ngrok-free.app' 
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: Bu origin engellendi.'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));








app.use(cookieParser()); 


const FileService = require("./interfaces/http/FileService/routers")
const pumpService = require("./interfaces/http/pump/routers")
const userService = require("./interfaces/http/user/routers")
const dbService = require("./interfaces/http/db_process/routers")







app.use("/api/files",FileService)
app.use("/api/pumps",pumpService)
app.use("/api/user",userService)
app.use("/api/db",dbService)









module.exports = app