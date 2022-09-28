import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.component.html',
  styleUrls: ['./ver-encuestas.component.css']
})
export class VerEncuestasComponent implements OnInit {

  data !: any;

  constructor(private encuestaService : EncuestaService) {
    this.data = this.encuestaService.obtenerEncuestas();
   }

  ngOnInit(): void {
  }

}
