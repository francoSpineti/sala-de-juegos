import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private ruta = '/chatMensajes';
  dataMensajes !: AngularFirestoreCollection<any>;
  chatMensajes : Observable<any[]>;

  constructor(private db : AngularFirestore) { 
    this.dataMensajes = this.db.collection<any>(this.ruta,ref => ref.orderBy('fechaYHora',"asc"));
    this.chatMensajes = this.dataMensajes.valueChanges(this.ruta);
  }

  obtenerMensajes(){
    return this.chatMensajes;
  }

  enviarMensaje(mensaje : any) : any{
    return this.dataMensajes.add({ ...mensaje });
  }

}
