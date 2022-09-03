import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
              private afAuth: AngularFireAuth,
              private router : Router,
              private logService : LogService) {}

  registro(email : string, contraseña : string){
    this.afAuth.createUserWithEmailAndPassword(email,contraseña)
    .then((res) =>{
      localStorage.setItem('user',JSON.stringify(res.user));
      this.logService.guardarLog(email,"registro e inicio de sesion");
      this.router.navigate(['/home']);
    })
    .catch(error => {alert(error.message)});
  }

}
