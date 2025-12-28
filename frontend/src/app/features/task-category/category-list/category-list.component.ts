import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticsService } from '../../../core/services/logistics.service';
import { TaskCategory } from '../../../core/models/task-category';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categories: TaskCategory[] = [];

  constructor(private service: LogisticsService) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }
}
