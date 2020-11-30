const express = require('express')
const server = express();

const router = require("./routes")

const logRequest = require("./middlewares/logLabel")

server.use(express.json())

server.get("/", (req, res) => {
    return res.json({ message: "API works! 🚀"})
})
// server.use(logRequest);
server.use(router)

server.listen(3333, () => {
    console.log("Server started at http://localhost:3333 🚀") 
})