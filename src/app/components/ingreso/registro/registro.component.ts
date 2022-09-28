import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup ,Validators} from '@angular/forms';
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
  foto !: File;
  auxReferencia : any;
  spiner : boolean = false;

  constructor(
    private formBuilder : FormBuilder,
    private usuarioService : UsuarioService,
    private storage : AngularFireStorage) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'contraseña' : ['',Validators.required],
      'tag' : ['',[Validators.required]],
      'imagen' : ['',[Validators.required,Validators.nullValidator]],
      'perfil' : ['',[Validators.required,Validators.nullValidator]]
    });
  }

  registrarse(){
    this.spiner = true;
    const email = this.formGroup.controls['email'].value;
    const contraseña = this.formGroup.controls['contraseña'].value;
    const tag = this.formGroup.controls['tag'].value;
    const perfil = this.formGroup.controls['perfil'].value;
    let rutaImagen : string = "";
    let ruta : string = "fotoUsuariosJuegos/".concat(tag);
    const rutaRef = this.storage.ref(ruta);
    this.auxReferencia = this.storage.upload(ruta,this.foto).snapshotChanges().pipe(
      finalize(()=>{
        rutaRef.getDownloadURL().subscribe(url =>{
                rutaImagen = url;
                this.spiner = false;
                this.usuarioService.registrar(email,contraseña,tag,rutaImagen,perfil);    
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
