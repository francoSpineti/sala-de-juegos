import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-mensajes',
  templateUrl: './chat-mensajes.component.html',
  styleUrls: ['./chat-mensajes.component.css']
})
export class ChatMensajesComponent implements OnInit {

  chats : any;

  constructor(private chatService : ChatService) { 
    this.chatService.obtenerMensajes().subscribe(chat =>{
      this.chats=chat;
    });
  }

  ngOnInit(): void {
  }
}
