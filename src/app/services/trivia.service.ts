import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http : HttpClient) { }

  obtenerPreguntas(){
    return this.http.get<any>("assets/preguntas.json");
  }
}