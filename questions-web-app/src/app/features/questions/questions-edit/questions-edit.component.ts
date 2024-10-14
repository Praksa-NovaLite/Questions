import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { CategoryType, AnswerType, QuestionDto, QuestionsClient, AnswerDto } from '../../../api/api-reference';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrl: './questions-edit.component.css'
})
export class QuestionsEditComponent {
  form!: FormGroup;
  categoryType = CategoryType;
  categories: number[] = Object.values(CategoryType).filter(value => typeof value === 'number').map(value => value as number);
  answerType = AnswerType;
  types: number[] = Object.values(AnswerType).filter(value => typeof value === 'number').map(value => value as number);
  dynamicControlNames: string[] = [];
  id!: number;
  question!: QuestionDto;
  answers: string[] = [];

  constructor(private questionsService: QuestionsClient, private route: ActivatedRoute) {
    this.form = new FormGroup({
      title: new FormControl(''),
      category: new FormControl<number | undefined>(undefined),
      answerType: new FormControl<number | undefined>(undefined),
      score: new FormControl(),
      answers: new FormArray([])
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.questionsService.getById(this.id).subscribe(
          question => {
            this.question = question;
            this.form.controls['title'].patchValue(question.title!);
            this.form.controls['category'].patchValue(question.category!);
            this.form.controls['answerType'].patchValue(question.type!);
            this.form.controls['score'].patchValue(question.score!);
            question.answers!.forEach(answer => {
              this.answersFormArray.push(
                new FormGroup({
                  answerName: new FormControl(answer.answerName),
                  isCorrect: new FormControl(answer.isCorrect)
                })
              );
            });
          },
          error => {
            console.error('Error fetching question:', error);
          }
        );
      }
    });
  }

  get answersFormArray(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  updateQuestion(): void {
    const updatedQuestion: QuestionDto = { ...this.question, ...this.form.value };
    this.questionsService.update(this.id, updatedQuestion).subscribe(
      updatedQuestion => {
        console.log("Successful", updatedQuestion)
      },
      error => {
        console.log("error", error)
      }
    );
  }

  addControl(controlName: string) {
    this.form.addControl(controlName, new FormControl(''));
    this.dynamicControlNames.push(controlName);
  }

  addAnswer() {
    const newAnswerGroup = new FormGroup({
      answerName: new FormControl(''),
      isCorrect: new FormControl(false)
    });
    this.answersFormArray.push(newAnswerGroup);
  }

  createQuestion() {
    const formData = this.form.value;

    const newQuestion = new QuestionDto({
      title: formData.title!,
      category: Number(formData.category),
      type: Number(formData.answerType),
      score: formData.score,
      answers: formData.answers.map((answer: any) => {
        return new AnswerDto({
          answerName: answer.answerName,
          isCorrect: answer.isCorrect
        });
      })
    });

    this.questionsService.create(newQuestion)
      .subscribe(
        (response: any) => {
          this.form.reset();
        },
        (error: any) => {
          console.error('Error while creating question:', error);
        }
      );
  }
}