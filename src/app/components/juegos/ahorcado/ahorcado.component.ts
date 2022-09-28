import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Puntos } from 'src/app/clases/puntos';
import { PuntajeService } from 'src/app/services/puntaje.service';
import Swal  from 'sweetalert2';
import { DialogoEncuestaComponent } from '../dialogo-encuesta/dialogo-encuesta.component';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  palabras = ["JUEGO", "AVION", "PROMOCION", "MONEDA", "COMPUTADORA", "CERVEZA", "ESCALAR", "PESCADO", "LAGO", "BOSQUE", "CAMARA", "ZAPATILLA", "SER", "PAIS", "VINOTECA", "MONTAÑA", "JUPITER", "EXTRATERRESTRE", "DIFICIL", "ABURRIDO", "AYUDA", "CELULAR", "FACULTAD", "INGENIERO"];
  palabraAAdivinar: string="";
  palabraAdivinadaPorAhora: string="";
  fallos: Array<string> = [];
  numeroDeFallos: number = 0;
  numeroDeAciertos: number = 0;
  botones!: Array<{letra: string, estado: string}>;

  constructor(private router: Router,private puntajeService : PuntajeService,private dialog: MatDialog) {}

  ngOnInit() {
      this.initGame();
  }

  initGame() {
      this.botones = [];
      this.numeroDeFallos = 0;
      this.numeroDeAciertos = 0;
      this.palabraAdivinadaPorAhora = '';
      this.fallos = [];
      let numero = Math.floor(Math.random() * this.palabras.length);
      this.palabraAAdivinar = this.palabras[numero];
      this.generarPalabraAdivinadaPorAhora();
      this.inicializarBotones();
  }

  generarPalabraAdivinadaPorAhora() {
      this.palabraAdivinadaPorAhora = '';
      for (let i = 0; i < this.palabraAAdivinar.length; i++) {
          this.palabraAdivinadaPorAhora += '_';
      }
  }

  letraPresionada(boton: {letra: string, estado: string}) {   
      if (boton.estado === 'noAcertado' || boton.estado === 'acertado')
          return;

      if (!this.letraAcertada(boton.letra)) {
          if (this.numeroDeFallos < 6) {
              this.aumentarFallos(boton.letra);
              if(this.numeroDeFallos == 6){
                this.mostrarEncuesta();
                this.mostrarMensajeDePerdedor();
              }
          }
          else{
            this.mostrarEncuesta();
            this.mostrarMensajeDePerdedor();
          }
          boton.estado = 'noAcertado';
      }
      else {
          if(this.numeroDeAciertos == this.palabraAAdivinar.length) {
              this.cargarPuntaje(10);
              this.mostrarMensajeDeGanador();
              this.mostrarEncuesta();
          }
          boton.estado = 'acertado';
      }
  }

  letraAcertada(letra: string): boolean {
      let longitud = this.palabraAAdivinar.length;
      let letraAcertada = false;
      for (let i = 0; i < longitud; i++) {
          if (letra == this.palabraAAdivinar[i]) {
              this.palabraAdivinadaPorAhora = (i == 0 ? '' : this.palabraAdivinadaPorAhora.substr(0, i)) + letra + this.palabraAdivinadaPorAhora.substr(i + 1);
              letraAcertada = true;
              this.numeroDeAciertos++;

          }
      }
      return letraAcertada;
  }

  aumentarFallos(letra: string) {
      this.fallos.push(letra);
      this.numeroDeFallos++;
  }

  mostrarMensajeDePerdedor() {
      setTimeout(() => {
          Swal.fire({
              icon: 'error',
              title: 'Perdiste!!!',
              text: 'Qué lástima! ¿Querés jugar de nuevo?',
              showCancelButton: true,
              confirmButtonText: `Aceptar`,
              confirmButtonColor: '#311B92'   
          }).then((result) => {
              if (result.isConfirmed) {
                  this.initGame();
              } else {
                  this.router.navigate(['juegos/lobby']);
              }
          })
      }, 500);
  }

  mostrarMensajeDeGanador() {
      Swal.fire({
          icon: 'info',
          title: 'Ganaste!!!',
          text: 'Felicitaciones, has ganado. ¿Quieres jugar de nuevo?',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#311B92'
      }).then((result) => {
          if (result.isConfirmed) {
              this.initGame();
          } 
          else {
              this.router.navigateByUrl('juegos/lobby');
          }
      })
  }
  
  inicializarBotones() {
      const longitud = this.letras.length;
      for(let i = 0; i < longitud; i++) {
          this.botones.push({letra: this.letras[i], estado: 'noPresionado'});
      }
  }

  cargarPuntaje(puntaje : number){
    this.puntajeService.guardarPuntaje("Ahorcado",puntaje);
  }

  mostrarEncuesta(){
    let numeroEncuesta = Math.round(Math.random()*100);

    if(numeroEncuesta == 48){
      this.dialog.open(DialogoEncuestaComponent,{
        data: {
          titulo: 'Nos interesa tu opinión! Completas una encuesta?',
          mensaje: 'Ir a Encuesta!'
        }
      });
    }
  }

}
