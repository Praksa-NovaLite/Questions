import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'questions',
        loadChildren: () => import('./features/questions/questions.module').then(m => m.QuestionsModule)
    },
    {
        path:'',
        redirectTo: 'questions',
        pathMatch: 'full'
    },
    {
        path: 'exams',
        loadChildren: () => import('./features/exams/exams.module').then(m => m.ExamsModule)
    },
    {
        path:'',
        redirectTo: 'exams',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
