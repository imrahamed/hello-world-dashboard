import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  { path: 'dashboard', component: GraphComponent },
  { path: 'logs', component: LogsComponent },
  { path: '**', redirectTo: '/dashboard' },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
