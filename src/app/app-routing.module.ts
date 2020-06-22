import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AuthGuard} from '@shared/guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'todo'},
  {path: 'auth', loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)},
  {path: 'todo', loadChildren: () => import('./layouts/todo/todo.module').then(m => m.TodoModule), canActivate: [AuthGuard]},
  {path: '404', loadChildren: () => import('./layouts/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
