import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of ,Subscription} from 'rxjs';
@Component({
  selector: 'app-compile',
  templateUrl: './compile.component.html',
  styleUrls: ['./compile.component.css']
})
export class CompileComponent implements OnInit{
  code:any;
  userInput:any;
  lang:any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
   
    
    this.code = this.route.snapshot.queryParamMap.get('code');
    this.lang = this.route.snapshot.queryParamMap.get('lang');
    this.userInput = this.route.snapshot.queryParamMap.get('userInput');
    console.log(this.lang+"27");
    
    const requestBody = { code: this.code, lang: this.lang,userInput:this.userInput};
   
    
    this.subscription=this.http.post('http://localhost:5000/compile',requestBody).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        return of({});
      })
    )
    .subscribe({
      next: (data: any) => {
        console.log("Post Success");
        
      }
    });
  }

  

}
