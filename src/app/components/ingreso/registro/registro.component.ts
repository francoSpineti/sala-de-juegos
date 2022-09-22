import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formGroup !: FormGroup;
  imagen: any= '';
  foto ?: File;
  auxReferencia : any;

  constructor(
    private formBuilder : FormBuilder,
    private authService: AngularFireAuth,
    private router: Router,
    private logService : LogService,
    private usuarioService : UsuarioService,
    private storage : AngularFireStorage) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'contraseña' : ['',Validators.required],
      'tag' : ['',[Validators.required]],
      'imagen' : ['',[Validators.required,Validators.nullValidator]]
    });
  }

  registrarse(){
    const email = this.formGroup.controls['email'].value;
    const contraseña = this.formGroup.controls['contraseña'].value;
    const tag = this.formGroup.controls['tag'].value;
    let rutaImagen : string = "";
    let ruta : string = "fotoUsuariosJuegos/".concat(email);
    let rutaRef = this.storage.ref(ruta);
    this.auxReferencia = this.storage.upload(ruta,this.foto).snapshotChanges().pipe(
      finalize(()=>{
        rutaRef.getDownloadURL().subscribe(url =>{
                rutaImagen = url;
                this.authService.createUserWithEmailAndPassword(email,contraseña)
                  .then(res =>{
                    this.logService.guardarLog(email,"registro e inicio de sesion");
                    this.usuarioService.conectarUsuario(email,false,tag,rutaImagen);
                    this.router.navigate(['/home']);
                  })
                  .catch(error => this.popUpMensaje('Error',error.message,true));
              });
            })
          ).subscribe();
  }

  private spacesValidator(control : AbstractControl) : null | object{
    const nombre = <string>control.value;
    const espacios = nombre.includes(' ');
    return espacios == true? {contieneEspacios : true} : null;
  }

  popUpMensaje(titulo : string,mensaje : string,error : boolean){
    Swal.fire(
       titulo,
       mensaje,
       error ? 'error' : 'success'
    )
  }

}
