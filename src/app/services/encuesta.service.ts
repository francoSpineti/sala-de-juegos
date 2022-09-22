import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private afs: AngularFirestore) { }

  guardar(encuesta : Encuesta){
    const id = this.afs.createId();
    return this.afs.collection('/encuesta').doc(id).set(encuesta.toJson());
  }
}
