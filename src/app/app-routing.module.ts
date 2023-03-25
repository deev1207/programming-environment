import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompileComponent } from './compile/compile.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path:'compile',component:CompileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
