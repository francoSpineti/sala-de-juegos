import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';

import { JuegosRoutingModule } from './juegos-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { TriviaComponent } from './trivia/trivia.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { SnakeComponent } from './snake/snake.component';
import { DialogoComponent } from './dialogo/dialogo.component';
import { DialogoEncuestaComponent } from './dialogo-encuesta/dialogo-encuesta.component';
import { ChangeBgDirective } from '../../change-bg.directive';

@NgModule({
  declarations: [
    LobbyComponent,
    AhorcadoComponent,
    TriviaComponent,
    MayorOMenorComponent,
    SnakeComponent,
    DialogoComponent,
    DialogoEncuestaComponent,
    ChangeBgDirective
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    NavbarModule
  ]
})
export class JuegosModule { }
