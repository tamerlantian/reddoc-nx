import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  readonly i18n = inject(I18nService);
  readonly t = this.i18n.t;
  readonly lang = this.i18n.lang;

  readonly appUrl = environment.appUrl;
  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window === 'undefined') return;
    this.scrolled.set(window.scrollY > 16);
  }

  setLang(l: 'es' | 'en'): void {
    this.i18n.setLang(l);
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
