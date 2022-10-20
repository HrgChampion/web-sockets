const express=require('express');
const app=express();
const http=require('http');
const {Server}=require('socket.io')
const cors=require("cors");
const commands=require("./data.json")
// let filtered=commands["nlp_commands"].filter(a=>a.includes("s"))
// console.log(filtered)
app.use(cors());

const server =http.createServer(app);
const io=new Server(server,{
    cors:{
        origin :"http://localhost:3000",
        methods:["GET","POST"],

    }
});
io.on("connection",(socket)=>{
    
console.log(`User connected:${socket.id}`)
socket.on('send_message',(data)=>{
    let filtered_commands=commands["nlp_commands"].filter(a=>a.toLowerCase().includes(data.message.toLowerCase()))

    socket.emit("recieve_message",filtered_commands.slice(0,10))
    
     console.log(data)
})
})

server.listen(3001,()=>{
    console.log("server is running on 3000")
})