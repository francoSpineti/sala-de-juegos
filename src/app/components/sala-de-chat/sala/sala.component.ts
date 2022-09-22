import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/clases/chat';
import { Usuario } from 'src/app/clases/usuario';
import { ChatService } from 'src/app/services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  chats : any;
  listaUsuarios: Set<Usuario> = new Set<Usuario>();
  mensajeChat = new Chat;

  constructor(private usuarioService : UsuarioService,private chatService : ChatService){
    this.listaUsuarios = this.usuarioService.obtenerUsuariosConectados();
    this.chatService.obtenerMensajes().subscribe(chat =>{
      this.chats=chat;
    });
  }

  ngOnInit(): void {
  }

  enviar(){
    let obj = JSON.parse(localStorage.getItem('user')!);
    this.mensajeChat.email = obj.email;
    this.mensajeChat.foto = obj.foto;
    this.mensajeChat.tag = obj.tag;
    this.chatService.enviarMensaje(this.mensajeChat);
    this.mensajeChat.mensaje="";
  }

}
