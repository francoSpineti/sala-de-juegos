import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  ahorcado(){
    this.router.navigate(['juegos/ahorcado']);
  }

  snake(){
    this.router.navigate(['juegos/snake']);
  }

  mayorOMenor(){
    this.router.navigate(['juegos/mayor-o-menor']);
  }

  trivia(){
    this.router.navigate(['juegos/trivia']);
  }

}
