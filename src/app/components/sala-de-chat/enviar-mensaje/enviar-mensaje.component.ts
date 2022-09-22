import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/clases/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent implements OnInit {
  
  mensajeChat = new Chat;
  constructor(private chatService : ChatService) { }

  ngOnInit(): void {
  }

  enviar(){
    let obj = localStorage.getItem('user');
    let cadena : any = obj?.split(":")[2].split(",")[0];
    let email = cadena.replace('"','').split('"')[0];
   /*  this.mensajeChat.hora;
    this.mensajeChat.usuario = email; */
    this.chatService.enviarMensaje(this.mensajeChat);
    this.mensajeChat.mensaje="";
  }

}
