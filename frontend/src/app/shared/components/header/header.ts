import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18n } from '../../../core/services/i18n';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  currentLang: string = 'pt';
  @Input() showMenuButton: boolean = true;
  @Output() menuClicked = new EventEmitter<void>();

  constructor(public i18nService: I18n) { }

  ngOnInit(): void {
    this.currentLang = this.i18nService.getCurrentLanguage();
  }

  changeLang(lang: string) {
    this.i18nService.setLanguage(lang);
    this.currentLang = lang;
  }

  onMenuClick() {
    this.menuClicked.emit();
  }
}
