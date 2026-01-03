import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogisticsService } from '../../../core/services/logistics.service';
import { ComplementaryTask } from '../../../core/models/complementary-task';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: ComplementaryTask[] = [];
  isLoading = true;

  constructor(private service: LogisticsService) {}

  ngOnInit(): void {
    this.service.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro:', err);
        this.isLoading = false;
      }
    });
  }
}
