import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:':pageName', component: AppComponent},
  {path: '', redirectTo:'/main',pathMatch:'full'},
  {path:'**', redirectTo:'/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
