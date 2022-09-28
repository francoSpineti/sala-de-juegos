import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl,FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup !: FormGroup;
  spiner : boolean = false;

  constructor(
     private formBuilder : FormBuilder,
     private authService: AngularFireAuth,
     private router: Router,
     private logService : LogService,
     private usuarioService : UsuarioService,
     private spinnerService : NgxSpinnerService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'contraseña' : ['',Validators.required]
    });
  }

  login(){
    this.spiner = true;
     const email = this.formGroup.controls['email'].value;
     const contraseña = this.formGroup.controls['contraseña'].value;
     this.authService.signInWithEmailAndPassword(email,contraseña)
     .then(res =>{
      this.usuarioService.conectarUsuario(email,true)
      .then(resp =>{
        this.spiner = false;
        this.formGroup.reset();
        this.logService.guardarLog(email,"inicio de sesion");
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.spiner=false;
        this.formGroup.reset();
        this.popUpMensaje('Error',error.message,true)});
     })
     .catch(error => {
      this.spiner=false;
      this.formGroup.reset();
      this.popUpMensaje('Error',error.message,true)});
  }

  accesoRapidoJugador(){
    this.formGroup.controls['email'].setValue("ejemplo@gmail.com");
    this.formGroup.controls['contraseña'].setValue("1234567");
  }
  
  accesoRapidoAdmin(){
    this.formGroup.controls['email'].setValue("admin@gmail.com");
    this.formGroup.controls['contraseña'].setValue("1234567");
  }

  private spacesValidator(control : AbstractControl) : null | object{
    const nombre = <string>control.value;
    const espacios = nombre.includes(' ');
    return espacios == true? {contieneEspacios : true} : null;
  }

  spinner() : void{
    this.spinnerService.show();
    setTimeout(() =>{
      this.spinnerService.hide();
    },8000);
  }

  popUpMensaje(titulo : string,mensaje : string,error : boolean){
    Swal.fire(
       titulo,
       mensaje,
       error ? 'error' : 'success'
    )
  }

}
