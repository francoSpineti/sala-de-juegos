import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { LogService } from 'src/app/services/log.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tag : string ="";
  imagen : string ="";
  isAdmin !: boolean;
  constructor(private logService : LogService, private usuarioService : UsuarioService) {
    this.isAdmin = this.usuarioService.isAdmin();
  }

  ngOnInit(): void {
    this.tag = this.obtenerTagUsuarioLogueado();
    this.imagen = this.obtenerImagenUsuarioLogueado();
  }

  obtenerTagUsuarioLogueado(){
    let obj = JSON.parse(localStorage.getItem('user')!);
    return obj.tag;
  }

  obtenerImagenUsuarioLogueado(){
    let obj = JSON.parse(localStorage.getItem('user')!);
    return obj.foto;
  }

  cerrarSesion(){
    this.logService.guardarLog(this.usuarioService.obtenerEmailUsuarioLogueado(),"cerro sesion");
    let obj = JSON.parse(localStorage.getItem('user')!);
    let aux : Usuario = new Usuario(obj.id,obj.email,obj.tag,false,obj.foto,obj.perfil);
    this.usuarioService.cerrarSesion(aux);
  }

}
