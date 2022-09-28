import { Component, OnInit } from '@angular/core';
import { Puntos } from 'src/app/clases/puntos';
import { PuntajeService } from 'src/app/services/puntaje.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tablaAhorcado !: Array<Puntos>;
  tablaMayorOMenor !: Array<Puntos>;
  tablaTrivia !: Array<Puntos>;
  tablaSnake !: Array<Puntos>;

  constructor(private puntajeService : PuntajeService) {
    this.tablaAhorcado = this.puntajeService.obtenerPuntosAhorcado();
    this.tablaTrivia = this.puntajeService.obtenerPuntosTrivia();
    this.tablaSnake = this.puntajeService.obtenerPuntosSnake();
    this.tablaMayorOMenor = this.puntajeService.obtenerPuntosMayorOMenor();
   }

  ngOnInit(): void {
   
  }
}
