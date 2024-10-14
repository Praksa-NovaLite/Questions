import { RouterModule, Routes } from "@angular/router";
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { QuestionsEditComponent } from "./questions-edit/questions-edit.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: QuestionsListComponent
    },
    {
        path: 'create',
        component: QuestionsEditComponent
    },
    {
        path: 'edit/:id',
        component: QuestionsEditComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsRoutingModule { }