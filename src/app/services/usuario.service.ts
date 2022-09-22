import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  dbPath : string = "/usuarioConectado";
  private usuariosColeccion !: AngularFirestoreCollection<Usuario>;
  usuarios : Observable<Usuario[]>;
  usuario !: Observable<Usuario>;

  constructor(private afs: AngularFirestore,private db : AngularFirestore, private router : Router) {
    this.usuariosColeccion = this.db.collection<Usuario>(this.dbPath);
    this.usuarios = this.usuariosColeccion.valueChanges(this.dbPath);
  }

  obtenerEmailUsuarioLogueado():string{
    let obj = JSON.parse(localStorage.getItem('user')!);
    return obj.email;
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

  async conectarUsuario(email:string,login:boolean,tag ?:string,foto ?: string){
    await this.obtenerUsuarioPorEmail(email)
     .then(res =>{
      if(login){
        let user : Usuario = new Usuario(res[0].id,res[0].email,res[0].tag,true,res[0].foto);
        localStorage.setItem('user',JSON.stringify(user));
        this.afs.collection(this.dbPath).doc(res[0].id).update(user.toJson());
      }else{
        let id = this.afs.createId();
        let user : Usuario = new Usuario(id,email,tag,true,foto);
        localStorage.setItem('user',JSON.stringify(user));
        this.afs.collection(this.dbPath).doc(id).set(user.toJson());
      }
    })
    .catch(error => console.log(error));
  }

  cerrarSesion(usuario:Usuario) {
    this.desconectarUsuario(usuario);
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
