import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
   ) {}

   iniciarSesion(email : string, contraseña : string){
    return this.afAuth.signInWithEmailAndPassword(email, contraseña);
  }

  obtenerEmailUsuarioLogueado():string{
    let obj = localStorage.getItem('user');
    let cadena : any = obj?.split(":")[2].split(",")[0];
    let email = cadena.replace('"','').split('"')[0];
    return email;
  }
  
}
