import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './sala/sala.component';

const routes: Routes = [{path:'chat', component : SalaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaDeChatRoutingModule { }
