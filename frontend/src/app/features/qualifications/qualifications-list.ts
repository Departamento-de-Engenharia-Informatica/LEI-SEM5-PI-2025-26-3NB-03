import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QualificationsService } from '../../core/services/qualifications.service';
import { QualificationDto } from '../../core/models/qualification';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-qualifications-list',
  templateUrl: './qualifications-list.html',
  styleUrls: ['./qualifications.css'],
  imports: [CommonModule, RouterModule, TranslatePipe]
})

export class QualificationsList implements OnInit {

  qualifications: QualificationDto[] = [];
  isLoading = false;

  errorMessage: string | null = null;

  constructor(private service: QualificationsService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.errorMessage = null;

    this.service.getAll().subscribe({
      next: list => {
        this.qualifications = list;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar qualificações';
        this.isLoading = false;
      }
    });
  }
}
