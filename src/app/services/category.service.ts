import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../common/category';
import { Question } from '../common/question';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  categoryUrl: string = 'http://localhost:8080/api/categories';
  getQuizUrl: string = 'http://localhost:8080/getGame';

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<GetResponseCategories>(this.categoryUrl)
      .pipe(map((response) => response._embedded.category));
  }

  getQuiz(categoryId: number): Observable<Question[]> {
    return this.httpClient.post<GetResponseQuestions>(`${this.getQuizUrl}/${categoryId}`, categoryId).pipe(map((response) => response.questions));
  }
}

interface GetResponseCategories {
  _embedded: {
    category: Category[];
  };
}

interface GetResponseQuestions {
    questions: Question[];
}
