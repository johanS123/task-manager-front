import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.sass',
})
export class HeaderMenuComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
