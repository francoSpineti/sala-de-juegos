import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaDeChatRoutingModule } from './sala-de-chat-routing.module';
import { SalaComponent } from './sala/sala.component';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    SalaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SalaDeChatRoutingModule,
    NavbarModule
  ]
})
export class SalaDeChatModule { }
