import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import {Environment} from "../injectors/environment";
import {Problem} from "../models/problem.model";
import {Test} from "../models/test.model";

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
    return this.http.put<Problem>(`${this.environment.apiUrl}/problems/${id}`, problem);
  }

  sendSolution(code: string, problemId: string): Observable<{result: string, solutionId: string}> {
    return this.http.post<{result: string, solutionId: string}>(`${this.environment.apiUrl}/problems/solve/${problemId}`, {code, language: 'python3'});
  }

  uploadFiles(files: FileList, problemId): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.post(`${this.environment.apiUrl}/tests/upload/${problemId}`, formData);
  }

  getFilesByProblemId(problemId: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.environment.apiUrl}/tests/problem/${problemId}`);
  }

  removeTest(id: string): Observable<any> {
    return this.http.delete(`${this.environment.apiUrl}/tests/${id}`);
  }
}
