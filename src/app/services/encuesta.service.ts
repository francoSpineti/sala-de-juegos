import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Encuesta } from '../clases/encuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  dbPath : string = "/encuesta";
  private encuestaColeccion !: AngularFirestoreCollection<Encuesta>;
  encuestas : Observable<Encuesta[]>;

  constructor(private afs: AngularFirestore) {
    this.encuestaColeccion = this.afs.collection<Encuesta>(this.dbPath);
    this.encuestas = this.encuestaColeccion.valueChanges(this.dbPath);
   }

  guardar(encuesta : Encuesta){
    const id = this.afs.createId();
    return this.afs.collection('/encuesta').doc(id).set(encuesta.toJson());
  }

  obtenerEncuestas(){
    let aux : Array<Encuesta> = [];
    this.encuestas.forEach(element => {
      element.forEach(res => {
              aux.push(res);
      });
    });
    return aux;
  }
}
