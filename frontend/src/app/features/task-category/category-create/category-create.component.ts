import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogisticsService } from '../../../core/services/logistics.service';
import { CreateTaskCategoryDto } from '../../../core/models/task-category';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  category: CreateTaskCategoryDto = {
    name: '',
    description: ''
  };

  message: string = '';
  isError: boolean = false;

  constructor(private service: LogisticsService) {}

  onSubmit() {
    this.message = '';

    this.service.createCategory(this.category).subscribe({
      next: (res) => {
        this.message = 'Categoria criada com sucesso!';
        this.isError = false;
        this.category = { name: '', description: '' }; // Limpar form
      },
      error: (err) => {
        this.isError = true;
        this.message = 'Erro ao criar categoria: ' + (err.error || 'Erro desconhecido');
        console.error(err);
      }
    });
  }
}
