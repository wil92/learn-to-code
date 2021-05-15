import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'problem',
    loadChildren: () => import('./feature/problem/problem.module').then(m => m.ProblemModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'problem/:id',
    loadChildren: () => import('./feature/problem/problem.module').then(m => m.ProblemModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'solve/:id',
    loadChildren: () => import('./feature/problem-details/problem-details.module').then(m => m.ProblemDetailsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
