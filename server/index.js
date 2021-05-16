require('dotenv').config()
const express = require('express');
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const http = require('http');
const { Server } = require("socket.io");

const port = process.env.PORT

const app = express();
const server = http.createServer(app);

app.use(morgan("common"))
app.use(helmet())
app.use(express.json())
app.use(cors())

const io = new Server(server,{
  cors:{
    origin : "*"
  }
});

// Emit Events
io.on('connect',(socket)=>{
    console.log("a user connected")
})

server.listen(port, () => {
  console.log('listening on *:5000');
});
