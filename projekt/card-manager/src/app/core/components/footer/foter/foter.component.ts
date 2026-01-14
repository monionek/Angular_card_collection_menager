import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-foter',
  imports: [],
  templateUrl: './foter.component.html',
  styleUrl: './foter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoterComponent {
  public readonly currentYear: number = new Date().getFullYear();
}
