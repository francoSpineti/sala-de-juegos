import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Puntos } from '../clases/puntos';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  dbPath : string = "/puntaje";
  private puntosColeccion !: AngularFirestoreCollection<Puntos>;
  puntos : Observable<Puntos[]>;

  constructor(private afs: AngularFirestore) {
    this.puntosColeccion = this.afs.collection<Puntos>(this.dbPath);
    this.puntos = this.puntosColeccion.valueChanges(this.dbPath);
   }

  guardarPuntaje(nombreJuego:string,puntaje:number){
    const id = this.afs.createId();
    let obj = JSON.parse(localStorage.getItem('user')!);
    let puntos : Puntos = new Puntos(id,nombreJuego,obj.email,obj.tag,puntaje);
    this.afs.collection('/puntaje').doc(id).set(puntos.toJson());
  }

  obtenerPuntosAhorcado(){
    let aux : Array<Puntos> = [];
    this.puntos.forEach(element => {
      element.forEach(res => {
          if(res.nombreJuego === 'ahorcado'){
              aux.push(res);
          }
      });
    });
    return aux;
  }

  obtenerPuntosMayorOMenor(){
    let aux : Array<Puntos> = [];
    this.puntos.forEach(element => {
      element.forEach(res => {
          if(res.nombreJuego === 'mayorOMenor'){
              aux.push(res);
          }
      });
    });
    return aux;
  }

  obtenerPuntosTrivia(){
    let aux : Array<Puntos> = [];
    this.puntos.forEach(element => {
      element.forEach(res => {
          if(res.nombreJuego === 'trivia'){
              aux.push(res);
          }
      });
    });
    return aux;
  }

  obtenerPuntosSnake(){
    let aux : Array<Puntos> = [];
    this.puntos.forEach(element => {
      element.forEach(res => {
          if(res.nombreJuego === 'snake'){
              aux.push(res);
          }
      });
    });
    return aux;
  }

}
