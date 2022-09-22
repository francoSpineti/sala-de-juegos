import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuienSoyService {

  constructor(private http : HttpClient) { }

  git = "https://api.github.com/users/francoSpineti";

  obtenerInfoGit(){
    let info : Array<any> = [];
    this.http.get(this.git).subscribe(res => {
        info.push(JSON.parse(JSON.stringify(res)));
    });
    return info;
  }
}
