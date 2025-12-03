import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StaffService } from '../../core/services/staff.service';
import { StaffMemberDto } from '../../core/models/staff';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-staff-list',
  templateUrl: './staff-list.html',
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  styleUrl: './staff.css'
})
export class StaffList implements OnInit {

  staff: StaffMemberDto[] = [];

  filter = {
    code: '',
    name: ''
  };

  constructor(private service: StaffService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.search(this.filter.code, this.filter.name)
      .subscribe({
        next: list => this.staff = list,
        error: () => window.alert('Erro ao carregar staff')
      });
  }
}
