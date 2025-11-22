import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { MENU_ITEMS, MenuItem } from '../../../core/navigation-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  public filteredMenuItems: MenuItem[] = [];

  constructor(public authService: Auth) { }

  ngOnInit() {
    this.filterMenu();
  }

  filterMenu() {
    const currentUserRole = this.authService.getRole();

    this.filteredMenuItems = MENU_ITEMS.filter(item => {
      return currentUserRole && item.requiredRoles.includes(currentUserRole);
    });
  }
}
