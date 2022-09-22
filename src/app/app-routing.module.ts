import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./components/ingreso/ingreso.module').then(m => m.IngresoModule)},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuardGuard]},
  {path: 'encuesta', component: EncuestaComponent,canActivate:[AuthGuardGuard]},
  {path: 'quienSoy', component: QuienSoyComponent,canActivate:[AuthGuardGuard]},
  {path: 'juegos', loadChildren: () => import('./components/juegos/juegos.module').then(m => m.JuegosModule),canActivate:[AuthGuardGuard]},
  {path: 'sala', loadChildren: () => import('./components/sala-de-chat/sala-de-chat.module').then(m => m.SalaDeChatModule),canActivate:[AuthGuardGuard] },
  {path: '**', component : ErrorComponent,canActivate:[AuthGuardGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
