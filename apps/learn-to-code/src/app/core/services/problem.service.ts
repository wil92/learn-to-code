import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Environment} from "../injectors/environment";
import {Problem} from "../models/problem.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient, private environment: Environment) {
  }

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(`${this.environment.apiUrl}/problems`);
  }

  getProblemById(id: string): Observable<Problem> {
    return this.http.get<Problem>(`${this.environment.apiUrl}/problems/${id}`);
  }

  deleteProblem(id: string): Observable<Problem> {
    return this.http.delete<Problem>(`${this.environment.apiUrl}/problems/${id}`);
  }

  createProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(`${this.environment.apiUrl}/problems`, problem);
  }

  editProblem(id: string, problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(`${this.environment.apiUrl}/problems/${id}`, problem);
  }
}
