import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeComponent {
  readonly t = inject(I18nService).t;
  readonly items = computed(() => this.t().marquee);
}
