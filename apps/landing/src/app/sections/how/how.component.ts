import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-how',
  standalone: true,
  templateUrl: './how.component.html',
  styleUrl: './how.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowComponent {
  readonly t = inject(I18nService).t;
}
