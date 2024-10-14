import { NgModule } from "@angular/core";
import { QuestionsEditComponent } from "./questions-edit/questions-edit.component";
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from "@angular/forms";
import { QuestionsRoutingModule } from "./questions-routing.module";
import { CommonModule } from "@angular/common";
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatFormField,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        QuestionsRoutingModule,
        MatListModule,
        MatTableModule,
        MatToolbarModule,
        MatCheckboxModule
    ],
    declarations: [
        QuestionsListComponent,
        QuestionsEditComponent
    ],
    exports: [
        QuestionsEditComponent,
        QuestionsListComponent
    ]
})
export class QuestionsModule { }