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
  constructor(private logService : LogService, private usuarioService : UsuarioService) { }

  ngOnInit(): void {
   // this.tag = this.obtenerTagUsuarioLogueado();
  }

  obtenerTagUsuarioLogueado(){
    let obj = JSON.parse(localStorage.getItem('user')!);
    return obj.tag;
  }

  cerrarSesion(){
    this.logService.guardarLog(this.usuarioService.obtenerEmailUsuarioLogueado(),"cerro sesion");
    let obj = JSON.parse(localStorage.getItem('user')!);
    let aux : Usuario = new Usuario(obj.id,obj.email,obj.tag,false,obj.foto);
    this.usuarioService.cerrarSesion(aux);
  }

}
