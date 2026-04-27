import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-modules',
  standalone: true,
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModulesComponent {
  readonly t = inject(I18nService).t;
  readonly activeIndex = signal(0);
  readonly active = computed(() => this.t().modules.items[this.activeIndex()]);

  setIndex(i: number): void {
    this.activeIndex.set(i);
  }
}
