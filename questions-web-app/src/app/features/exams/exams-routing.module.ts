import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratingExamComponent } from './generating-exam/generating-exam.component';

const routes: Routes = [
  {
    path: 'add',
    component: GeneratingExamComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
