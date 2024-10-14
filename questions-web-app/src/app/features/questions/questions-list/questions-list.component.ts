import { Component, OnInit } from '@angular/core';
import { AnswerType, CategoryType, QuestionDto, QuestionsClient } from '../../../api/api-reference';
import { Observable, map, switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css'
})
export class QuestionsListComponent implements OnInit {
  questions = [] as QuestionDto[];
  categoryType = CategoryType;
  categories: number[] = Object.values(CategoryType).filter(value => typeof value === 'number').map(value => value as number);
  answerType = AnswerType;
  id!: number;
  question!: QuestionDto;

  constructor(private readonly client: QuestionsClient, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.client.getAll().subscribe(result => this.questions = result);
  }
  
  navigate(id?: number) {
      this.router.navigate(['/edit', id]);
  }
}