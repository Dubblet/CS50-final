import { Component, OnInit, Input } from '@angular/core';
import { AbiliStats } from 'src/app/models/abilistats';

export interface pokeAbility {
  name: string;
  detail: string;
}

@Component({
  selector: 'poke-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent {
  @Input() abilityStats = new AbiliStats();
  
  displayedColumns: string[] = ['name', 'detail'];
  dataSource: pokeAbility[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.dataSource = this.abilityStats.ability
      .split(';')
      .map((abilities) => abilities.split(':'))
      .map((ability) => {
        return {name: ability[0], detail: ability[1]}
      });
  }

}
