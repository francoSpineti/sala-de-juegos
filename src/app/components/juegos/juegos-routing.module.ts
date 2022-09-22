import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { SnakeComponent } from './snake/snake.component';
import { TriviaComponent } from './trivia/trivia.component';

const routes: Routes = [
    {path: 'lobby', component: LobbyComponent},
    {path: 'ahorcado', component: AhorcadoComponent},
    {path: 'mayor-o-menor', component: MayorOMenorComponent},
    {path: 'snake', component: SnakeComponent},
    {path: 'trivia', component: TriviaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
