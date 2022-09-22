import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Puntos } from '../clases/puntos';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(private afs: AngularFirestore) { }

  guardarPuntaje(nombreJuego:string,puntaje:number){
    const id = this.afs.createId();
    let puntos : Puntos = new Puntos(id,nombreJuego,this.usuario().toJson(),puntaje);
    this.afs.collection('/puntaje').doc(id).set(puntos.toJson());
  }

  usuario(){
    let obj = JSON.parse(localStorage.getItem('user')!);
    return new Usuario(obj.id,obj.email,obj.tag,obj.online,obj.foto);
  }

}
