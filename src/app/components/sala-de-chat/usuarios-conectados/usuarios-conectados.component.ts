import { Component, OnInit} from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios-conectados',
  templateUrl: './usuarios-conectados.component.html',
  styleUrls: ['./usuarios-conectados.component.css'],
})

export class UsuariosConectadosComponent implements OnInit {

  listaUsuarios: Set<Usuario> = new Set<Usuario>();

  constructor(private usuarioService : UsuarioService){
    this.listaUsuarios = this.usuarioService.obtenerUsuariosConectados();    
  }

  ngOnInit(): void {
  }

}
