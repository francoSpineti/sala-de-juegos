import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LogService } from './log.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  dbPath : string = "/usuarioConectado";
  private usuariosColeccion !: AngularFirestoreCollection<Usuario>;
  usuarios : Observable<Usuario[]>;
  usuario !: Observable<Usuario>;

  constructor(private afs: AngularFirestore,private db : AngularFirestore, private router : Router,private authService: AngularFireAuth,
    private logService : LogService) {
    this.usuariosColeccion = this.db.collection<Usuario>(this.dbPath);
    this.usuarios = this.usuariosColeccion.valueChanges(this.dbPath);
  }

  obtenerEmailUsuarioLogueado():string{
    let obj = JSON.parse(localStorage.getItem('user')!);
    return obj.email;
  }

  isAdmin(){
    let obj = JSON.parse(localStorage.getItem('user')!);
    return obj.perfil === 'admin';
  }

  desconectarUsuario(usuario:Usuario){
   this.afs.collection(this.dbPath).doc(usuario.getID()).update(usuario.toJson());
  }

  obtenerUsuariosConectados(){
    let mySet : Set<Usuario> = new Set<Usuario>();
    this.db.collection(this.dbPath, ref => ref.where('online','==', true)).valueChanges()
    .subscribe(ref =>{
      let aux = ref as Usuario[];
      mySet.clear();
      for (let index = 0; index < aux.length; index++) {
            const element = aux[index];
            mySet.add(element);
      }
      });
      return mySet;
  }

  obtenerUsuarioPorEmail(email:string) {
    return new Promise<any>((resolve)=> {
    this.db.collection(this.dbPath, ref => ref.where('email','==', email)).valueChanges().subscribe(users => resolve(users))})
  }

  registrar(email:string,contraseña:string,tag ?:string,foto ?: string, perfil ?: string){
    this.authService.createUserWithEmailAndPassword(email,contraseña)
    .then(res =>{
      this.conectarUsuario(email,false,tag,foto,perfil);
    })
    .catch(error => this.popUpMensaje('Error',error.message,true));
  }

  async conectarUsuario(email:string,login:boolean,tag ?:string,foto ?: string, perfil ?: string){
    await this.obtenerUsuarioPorEmail(email)
     .then(res =>{
      if(login){
        let user : Usuario = new Usuario(res[0].id,res[0].email,res[0].tag,true,res[0].foto,res[0].perfil);
        localStorage.setItem('user',JSON.stringify(user));
        this.afs.collection(this.dbPath).doc(res[0].id).update(user.toJson());
      }else{
        let id = this.afs.createId();
        let user : Usuario = new Usuario(id,email,tag,true,foto,perfil);
        localStorage.setItem('user',JSON.stringify(user));
        this.afs.collection(this.dbPath).doc(id).set(user.toJson());
        this.logService.guardarLog(email,"registro e inicio de sesion");
        this.router.navigate(['/home']);
      }
    })
    .catch(error => console.log(error));
  }

  cerrarSesion(usuario:Usuario) {
    this.desconectarUsuario(usuario);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  popUpMensaje(titulo : string,mensaje : string,error : boolean){
    Swal.fire(
       titulo,
       mensaje,
       error ? 'error' : 'success'
    )
  }

}
