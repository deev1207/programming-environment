import { Component ,AfterViewInit,OnInit,ViewEncapsulation,ViewChild,ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { io } from "socket.io-client";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit{
  term = new Terminal();
  container!: any;
  bool:boolean=false;
  bool2:boolean=false;
  socket = io("http://localhost:5000/");
  title = 'monaco-editor';
  editorOptions = {theme: 'vs-dark', language: 'cpp'};
  code:any="//Enter code here"
  compiledCode:any;
  output:any;
  constructor(private http: HttpClient) {} 
  change(editor){
    console.log(editor);
    this.compiledCode=editor;
  }


  async onCompile(){
    console.log("31");
    
    this.bool2=false;
    this.bool=false;
    console.log(this.code);
    this.socket.emit("hello from client",this.code);
    // this.socket.on("hello from server", (res) => {
    //   console.log(res);
    //   this.output=res;
    //   this.term.write(this.output);
    // })

    // let promise = new Promise((resolve, reject) => {
    //   setTimeout(() => resolve("done!"), 3000)
    // });
     this.socket.on("code-output",outputs=>{ 
      console.log("46");
      
      this.output=outputs;
      console.log(this.output+"50");
      
      this.term.write(this.output);
     
    })
    this.term.onKey(e=>{
    
      console.log("56");
      
      // this.term.write(e.key);
       


           this.socket.emit('keypress',e)
        
        
      })
    // let result = await promise;
    // if(result){
    //   this.bool2=true
    // }
    // else{
    //   console.log('err');
      
    // }

   
  }
  //   onSubmit(){
  //     this.bool=true;
  //     this.bool2=false;
  //     console.log(this.code);

  //     this.socket.emit("hello from client",this.code);
  //      this.socket.on("code-output",output=>{
  //       console.log("deev");
         
  //       this.output=output;this.term.write(output);
  //     })

  // } 

  ngAfterViewInit(){ 
    this.term.open(document.getElementById('terminal'));
    this.term.write('Welcome to xterm.js');
    

    // this.socket.on("fromTerm",(data)=>{
    //   this.term.write(data);
    // })
  }
 
}








  
    
    


