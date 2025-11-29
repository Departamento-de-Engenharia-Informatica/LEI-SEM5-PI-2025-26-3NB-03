import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StaffService } from '../../core/services/staff.service';
import { UpdateStaffMemberDto, StaffMemberDto } from '../../core/models/staff';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.html',
  imports: [CommonModule, FormsModule, TranslatePipe],
  styleUrl: './staff.css'
})
export class StaffEdit implements OnInit {

  code!: string;

  model: UpdateStaffMemberDto = {
    name: '',
    email: ''
  };

  isLoading = false;
  isSaving = false;

  constructor(
    private service: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.code = this.route.snapshot.params['code'];
    this.load();
  }

  load() {
    this.isLoading = true;

    this.service.search(this.code, '')
      .subscribe({
        next: list => {
          const s: StaffMemberDto = list[0];
          this.model.name = s.name;
          this.model.email = s.email;
          this.isLoading = false;
        },
        error: () => {
          window.alert('Erro ao carregar staff');
          this.isLoading = false;
        }
      });
  }

  save() {
    this.isSaving = true;

    this.service.update(this.code, this.model)
      .subscribe({
        next: () => {
          window.alert('Staff atualizado com sucesso!');
          this.router.navigate(['/staff']);
        },
        error: () => {
          window.alert('Erro ao atualizar staff');
          this.isSaving = false;
        }
      });
  }
}
