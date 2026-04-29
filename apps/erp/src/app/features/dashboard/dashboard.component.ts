import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div style="padding: 2rem; font-family: system-ui, sans-serif;">
      <h1>Dashboard</h1>
      <p>Bienvenido, {{ authService.currentUser()?.email }}</p>
      <p-button label="Cerrar sesión" severity="secondary" (onClick)="authService.logout()" />
    </div>
  `,
})
export class DashboardComponent {
  readonly authService = inject(AuthService);
}
