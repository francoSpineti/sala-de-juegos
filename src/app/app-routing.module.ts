import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./components/ingreso/ingreso.module').then(m => m.IngresoModule)},
  {path: 'home', component: HomeComponent},
  {path: 'quienSoy', component: QuienSoyComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
