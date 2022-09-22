import { Injectable } from '@angular/core';

@Injectable()
export class BestScoreManager {

  private ngxSnake : string = 'ngx_snake';

  public store(score: number) {
    localStorage.setItem(this.ngxSnake, JSON.stringify({ 'best_score': score }));
  }

}
