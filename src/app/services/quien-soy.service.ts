import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuienSoyService {

  constructor(private http : HttpClient) { }

  git = "https://api.github.com/users/francoSpineti";

  obtenerInfoGit(){
   return this.http.get(this.git);
  }
}
