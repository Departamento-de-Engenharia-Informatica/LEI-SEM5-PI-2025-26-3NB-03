import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyService } from '../../../core/services/privacy.service';
import { PrivacyPolicy } from '../../../core/models/privacy';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  policy: PrivacyPolicy | null = null;
  loading = true;

  constructor(private privacyService: PrivacyService) {}

  ngOnInit(): void {
    this.privacyService.getLatestPolicy().subscribe({
      next: (data) => {
        this.policy = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar política', err);
        this.loading = false;
      }
    });
  }
}
