import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StaffService } from '../../core/services/staff.service';
import { CreateStaffMemberDto } from '../../core/models/staff';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-staff-create',
  templateUrl: './staff-create.html',
  imports: [CommonModule, FormsModule, TranslatePipe],
  styleUrl: './staff.css'
})
export class StaffCreate {

  model: CreateStaffMemberDto = {
    code: '',
    name: '',
    email: ''
  };

  isSaving = false;

  constructor(
    private service: StaffService,
    private router: Router
  ) {}

  save() {
    this.isSaving = true;

    this.service.create(this.model).subscribe({
      next: () => {
        window.alert('Staff criado com sucesso!');
        this.router.navigate(['/staff']);
      },
      error: () => {
        window.alert('Erro ao criar staff');
        this.isSaving = false;
      }
    });
  }
}
