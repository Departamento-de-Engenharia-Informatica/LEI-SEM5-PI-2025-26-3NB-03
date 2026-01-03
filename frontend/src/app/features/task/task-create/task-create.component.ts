import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LogisticsService } from '../../../core/services/logistics.service';
import { CreateComplementaryTaskDto } from '../../../core/models/complementary-task';
import { TaskCategory } from '../../../core/models/task-category';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  task: CreateComplementaryTaskDto = {
    name: '',
    description: '',
    categoryId: '',
    active: true
  };

  categories: TaskCategory[] = [];
  message: string = '';
  isError: boolean = false;

  constructor(private service: LogisticsService) {}

  ngOnInit(): void {

    this.service.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  onSubmit() {
    this.message = '';
    this.service.createTask(this.task).subscribe({
      next: (res) => {
        this.message = 'TASKS.SUCCESS';
        this.isError = false;

        this.task = { name: '', description: '', categoryId: '', active: true };
      },
      error: (err) => {
        this.isError = true;
        this.message = 'Erro: ' + (err.error || 'Erro desconhecido');
      }
    });
  }
}
