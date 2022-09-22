import { Component, OnInit } from '@angular/core';
import { QuienSoyService } from 'src/app/services/quien-soy.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {

  data : any=[];

  constructor(private service : QuienSoyService) { }

  ngOnInit(): void {
    this.infoGit();
  }

  infoGit(){
    this.data = this.service.obtenerInfoGit();
    console.log(this.data);
  }

}
