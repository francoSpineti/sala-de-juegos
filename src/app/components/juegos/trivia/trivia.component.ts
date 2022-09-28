import { Component, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEncuestaComponent } from '../dialogo-encuesta/dialogo-encuesta.component';
import { PuntajeService } from 'src/app/services/puntaje.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  constructor(private triviaService: TriviaService,private dialog: MatDialog,private puntajeService : PuntajeService) { }

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions() {
    this.triviaService.obtenerPreguntas()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
      this.puntajeService.guardarPuntaje('trivia',this.points);
      this.mostrarEncuesta();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  mostrarEncuesta(){
    let numeroEncuesta = Math.round(Math.random()*100);

    if(numeroEncuesta == 48){
      this.dialog.open(DialogoEncuestaComponent,{
        data: {
          titulo: 'Nos interesa tu opinión! Completas una encuesta?',
          mensaje: 'Ir a Encuesta!'
        }
      });
    }
  }

}
