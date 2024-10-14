import { Component } from '@angular/core';
import { ExamsClient, CategoryType, ExamDto, FileResponse, Entity,AddExam } from '../../../api/api-reference';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { identity } from 'rxjs';

@Component({
  selector: 'app-generating-exam',
  templateUrl: './generating-exam.component.html',
  styleUrls: ['./generating-exam.component.css']
})
export class GeneratingExamComponent {
  form: FormGroup;
  categoryTypes = CategoryType;
  categories: number[] = Object.values(CategoryType).filter(value => typeof value === 'number').map(value => value as number);
  selectedCategories: number[] = [];
  id: number = 0;

  constructor(private examsClient: ExamsClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      categories: [[]]
    });
  }

  toggleCategorySelection(category: number) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.form.get('categories')?.setValue(this.selectedCategories);
  }

  isCategorySelected(category: number): boolean {
    return this.selectedCategories.includes(category);
  }

  generateExam() {
    const examDto = new ExamDto({
      candidateId: 1, 
      questions: [],
      maxScore: 0 
    });
  
    const addExamData = new AddExam({
      categoryTypes: this.selectedCategories,
      examDto: examDto
    });
  
    this.examsClient.addExam(addExamData).subscribe(
      (fileResponse: FileResponse) => {
        console.log('Exam created successfully:', fileResponse.headers);
      },
      (error: any) => {
        console.error('Error occurred while creating exam:', error);
      }
    );
  }

 
}

