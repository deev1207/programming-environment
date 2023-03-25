const express= require('express');
const app = express();
const path = require('path')
const cors=require('cors');
const http=require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
var os = require('os');
var pty = require('node-pty');

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: "assets",
  env: process.env
});


const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const fs=require('fs');

let outputCode;
socket.emit("code-output", outputCode);hgb
io.on("connection", (socket) => {

  console.log("34");
  socket.on("hello from client", (code) => {
    console.log("36");

    ptyProcess.onData((output)=> {
        console.log("40");
        this.outputCode=output
        
  
     
      
    });

  
   
    fs.writeFile("assets/test.cpp",code,(err)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("assets/test.cpp", "utf8"));
      }
  })

  // const { exec, spawn } = require("child_process");
  console.log("62");
      ptyProcess.write("g++ test.cpp; ./a.exe\r ");
        
  
   
      // exec("g++ assets/test.cpp", (error, stdout, stderr) => {
      //   if (error) {
      //     console.log(`error: ${error.message}`);
      //     return;
      //   }
      //   if (stderr) {
      //     console.log(`stderr: ${stderr}`);
      //     return;
      //   }
      
      //   const child = spawn("./a"); //where a is the exe file generated on compiling the code.
      // //   child.stdin.write("4 5");
      // //   child.stdin.end();
      //   child.stdout.on("data", (data) => {
      //     outputCode=data;
      //     console.log(`child stdout:\n${data}`);
      //   });
      // });
      
  });

    socket.on("keypress",(input)=>{
    console.log("77");
    console.log(input+"83");
    console.log("91");
    ptyProcess.write(input);
    // ptyProcess.write("./a.exe\r ");
    // ptyProcess.onData((output)=> {
    //   console.log(output+"d");
    //   socket.emit("code-output", output);});
  })

  // socket.on("toTerm",(data)=>{
  //   ptyProcess.write(data)
  // })


 
});



// app.post('/compile',(req,res)=>{
//     code=req.body.code;
   
// })
    
//     // app.post("/",(req,res)=>{
      
//     // })

//     app.get("/",(req,res)=>{
      
//     })
    

    
    



// app.get('/compile',(req,res)=>{
//     res.send(code)
// })

    

server.listen(5000,()=>{
    console.log('listening');
}
)