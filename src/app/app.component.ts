import { Component, AfterViewInit, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Terminal } from 'xterm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  term = new Terminal();
  userInput: any;
  title = 'monaco-editor';
  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: any;
  lang: string = 'java';
  onChange(event: Event) {
    console.log("23");
    const lang = (event.target as HTMLInputElement).value
    console.log(lang);
    this.lang = lang;
    this.editorOptions = { theme: 'vs-dark', language: lang }
  }



  compiledCode: any;
  output: any;
  constructor(private router: Router, private http: HttpClient) { }
  change(editor) {
    console.log(editor);
    this.compiledCode = editor;
  }


  async onCompile() {
    const requestBody = { code: this.code, lang: this.lang, userInput: this.userInput };
    this.http.post('http://localhost:5000/compile', requestBody)
      .subscribe({
        next: (data: any) => {
          console.log("Post Success");
        }
      });
  }



  ngOnInit() {
    this.router.navigate([''])
  }


}













