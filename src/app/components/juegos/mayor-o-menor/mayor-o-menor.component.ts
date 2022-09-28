import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PuntajeService } from 'src/app/services/puntaje.service';
import { DialogoEncuestaComponent } from '../dialogo-encuesta/dialogo-encuesta.component';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.css']
})
export class MayorOMenorComponent implements OnInit {

  numeroSecreto: number = 0;
  numeroIngresado : string = "";
  mensajes : string = "";
  contador !: number;
  ocultarVerificar !: boolean;
  usuarioLogueado : any;
  gano !: boolean;

  constructor(private puntajeService : PuntajeService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.contador = 0;
    this.numeroSecreto = this.generarnumero();
  }

  verificar()
  {
    this.contador++;
    this.ocultarVerificar=true;
    this.numeroIngresado = (<HTMLInputElement>document.getElementById("numeroIngresado")).value;
    if (parseInt(this.numeroIngresado) === this.numeroSecreto){
      this.puntajeService.guardarPuntaje("mayorOMenor",25);
      this.MostarMensaje("GANASTE!",true);
      this.mostrarEncuesta();
      this.numeroSecreto=0;
    }else{
      let mensaje:string;
      switch (this.contador) {
        case 1:
          mensaje="No, intento fallido, animo";
          break;
          case 2:
          mensaje="No,te estaras acercando?";
          break;
          case 3:
          mensaje="No es, crei que la tercera era la vencida.";
          break;
          case 4:
          mensaje="No es el  "+this.numeroIngresado;
          break;
          case 5:
          mensaje= "Perdiste, se te acabaron los intentos";
          break;
          case 6:
          mensaje="Afortunado en el amor...";
          break;
      
        default:
            mensaje="Ya le erraste "+ this.contador+" veces";
          break;
      }
      if (this.contador < 5 ){
      this.MostarMensaje("#"+this.contador+": "+mensaje+", Tip :"+this.retornarAyuda());
      }else{
        this.MostarMensaje("#"+this.contador+": "+mensaje);
        this.numeroSecreto=0;
    }
  } 
  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.mensajes=mensaje;    
    let x:any = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar=false;
     }, 3000);
    console.info("objeto",x);
   }

  generarnumero() : number{
    this.contador=0;
    return this.numeroSecreto = Math.floor((Math.random() * 50) + 1);
  }

  retornarAyuda() {
    if (parseInt(this.numeroIngresado) < this.numeroSecreto) {
      return "Te falta";
    }
    return "Te pasate";
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
