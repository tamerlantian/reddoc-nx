import { Injectable, computed, signal } from '@angular/core';
import { Dict, Lang, dictionaries } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly _lang = signal<Lang>('es');

  readonly lang = this._lang.asReadonly();
  readonly t = computed<Dict>(() => dictionaries[this._lang()]);

  setLang(lang: Lang): void {
    this._lang.set(lang);
  }

  toggle(): void {
    this._lang.update((l) => (l === 'es' ? 'en' : 'es'));
  }
}
