import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent {
  readonly t = inject(I18nService).t;
}
