import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'problem',
    loadChildren: () => import('./feature/problem/problem.module').then(m => m.ProblemModule)
  },
  {
    path: 'problem/:id',
    loadChildren: () => import('./feature/problem/problem.module').then(m => m.ProblemModule)
  },
  {
    path: 'solve/:id',
    loadChildren: () => import('./feature/problem-details/problem-details.module').then(m => m.ProblemDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
