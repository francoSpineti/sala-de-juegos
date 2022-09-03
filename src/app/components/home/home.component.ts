import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
              private router : Router, 
              private logService : LogService,
              private authService : AuthService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.logService.guardarLog(this.authService.obtenerEmailUsuarioLogueado(),"cerro sesion");
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
