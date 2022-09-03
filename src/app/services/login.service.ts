import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
              private afAuth: AngularFireAuth, 
              private router : Router,
              private logService : LogService) {}

  iniciarSesion(email : string, contraseña : string){
     this.afAuth.signInWithEmailAndPassword(email, contraseña)
     .then((res) =>{
      localStorage.setItem('user',JSON.stringify(res.user));
      this.logService.guardarLog(email,"inicio de sesion");
      this.router.navigate(['/home']);
      })
     .catch(error => {console.log(error.message)});
  }

}
