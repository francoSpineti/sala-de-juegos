import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Log } from '../clases/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private afs: AngularFirestore) { }

  guardarLog(email : string,accion : string){
    const id = this.afs.createId();
    let log : Log = new Log(id,email,new Date().toLocaleDateString(),new Date().toTimeString(),accion);
    return this.afs.collection('/logs').doc(id).set(log.toJson());
  }
}
