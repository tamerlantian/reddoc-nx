import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShellComponent } from './sections/shell/shell.component';

@Component({
  imports: [ShellComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
