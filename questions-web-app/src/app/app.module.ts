import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { QuestionsModule } from "./features/questions/questions.module";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './core/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ExamsModule } from "./features/exams/exams.module";
import { JwtInterceptor } from "./jwt.interceptor";


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        QuestionsModule,
        HttpClientModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        ExamsModule,
        MatCardModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }