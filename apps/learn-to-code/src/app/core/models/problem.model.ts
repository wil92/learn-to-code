export interface Problem {
  _id?: string;
  title: string;
  description: string;
  inputDescription: string;
  inputExample: string;
  outputDescription: string;
  outputExample: string;
  solution: Solution;
  enabled: boolean;
}

export interface Solution {
  status: string;
  language: string;
}
