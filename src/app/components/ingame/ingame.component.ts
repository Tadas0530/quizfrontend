import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/common/question';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.css'],
})
export class IngameComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute
  ) {}

  // QUESTION MECHANICS VARIABLES

  currentQuestionNumber: number = 0;
  currentQuestion: Question = null!;
  quiz: Question[] = null!;
  currentCategory: number = null!;

  // BOOLEAN VARIABLES

  hasAnswered: boolean = false;
  isGuessRight: boolean = null!;

  // TIMER VARIABLES

  subscribeTimer: number = null!;
  timeLeft: number = 90;
  abc : Subscription;

  // POINT SYSTEM

  points: number = 0;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => {
      this.currentCategory =
        +this.activeRoute.snapshot.paramMap.get('categoryId')!;
      console.log('current path id' + this.currentCategory);
      this.startGame();
    });
  }

  startGame() {
    this.getQuestions();
    setTimeout(() => {
      this.loadQuestion();
    }, 100);
  }

  loadQuestion() {
    if(this.currentQuestionNumber <= 10) {
      this.currentQuestion = this.quiz[this.currentQuestionNumber];
      this.currentQuestionNumber++;
      this.hasAnswered = false;
      this.observableTimer();
    }
  }

  getQuestions() {
    this.categoryService.getQuiz(this.currentCategory).subscribe((data) => {
      this.quiz = data;
      console.log(this.quiz[1].answers);
    });
  }

  observableTimer() {
    const source = timer(0, 1000);
    this.abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if(this.subscribeTimer === 0) {
        this.stopTheTimer();
      }
    });
  }

  stopTheTimer() {
    this.abc.unsubscribe();
  }

  checkIfAnswerIsCorrect(isCorrect: boolean): boolean {
    this.isGuessRight = isCorrect;
    this.hasAnswered = true;
    this.computePoints();
    return isCorrect;
  }

  computePoints() : number {
    if(this.isGuessRight && this.subscribeTimer !== 0) {
      this.points += (this.subscribeTimer + 125);
    } else if(this.isGuessRight) {
      this.points += 100;
    }
    return this.points;
  }
}
