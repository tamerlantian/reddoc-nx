import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

type Track = 'billing' | 'erp';

@Component({
  selector: 'app-pricing',
  standalone: true,
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
  readonly t = inject(I18nService).t;
  readonly track = signal<Track>('billing');

  readonly plans = computed(() =>
    this.track() === 'billing' ? this.t().pricing.plans_billing : this.t().pricing.plans_erp,
  );

  setTrack(t: Track): void {
    this.track.set(t);
  }
}
