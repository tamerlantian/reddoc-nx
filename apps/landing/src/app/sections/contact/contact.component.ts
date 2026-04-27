import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly t = inject(I18nService).t;
  readonly submitted = signal(false);

  readonly today = this.makeReqId();

  readonly form = signal({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  update<K extends keyof ReturnType<typeof this.form>>(key: K, value: string): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  submit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
  }

  private makeReqId(): string {
    const d = new Date();
    const y = d.getFullYear().toString().slice(2);
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}${m}${day}`;
  }
}
