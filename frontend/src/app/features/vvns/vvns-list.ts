import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VvnsService } from '../../core/services/vvns.service';

@Component({
  standalone: true,
  selector: 'app-vvns-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './vvns-list.html',
  styleUrls: ['./vvns-list.css']
})
export class VvnsListComponent implements OnInit {

  filters = {
    vessel: '',
    status: '',
    representative: '',
    from: '',
    to: ''
  };

  vvns: any[] = [];
  isLoading = false;

  constructor(private service: VvnsService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;

    this.service.search(this.filters).subscribe({
      next: (items) => {
        this.vvns = items;
        this.isLoading = false;
      },
      error: () => {
        alert('Erro ao carregar notificações.');
        this.isLoading = false;
      }
    });
  }
}
