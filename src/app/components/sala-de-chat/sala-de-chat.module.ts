import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaDeChatRoutingModule } from './sala-de-chat-routing.module';
import { SalaComponent } from './sala/sala.component';
import { UsuariosConectadosComponent } from './usuarios-conectados/usuarios-conectados.component';
import { ChatMensajesComponent } from './chat-mensajes/chat-mensajes.component';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    SalaComponent,
    UsuariosConectadosComponent,
    ChatMensajesComponent,
    EnviarMensajeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SalaDeChatRoutingModule,
    NavbarModule
  ]
})
export class SalaDeChatModule { }
