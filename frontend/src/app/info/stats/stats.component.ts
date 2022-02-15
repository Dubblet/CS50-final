import { Component, OnInit, Input } from '@angular/core';
import { AbiliStats, bst } from 'src/app/models/abilistats';

export interface BaseStats {
  name: string;
  stat: number;
  bar: number;
}

@Component({
  selector: 'poke-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  @Input() abilityStats = new AbiliStats();

  displayedColumns: string[] = ['name', 'stat', 'bar'];
  dataSource: BaseStats[] = [];

  constructor() { }

  ngOnChanges(): void {
    console.log(this.abilityStats)
    this.dataSource = [
      {name: 'HP', stat: this.abilityStats.hp, bar: (this.abilityStats.hp/255*100)},
      {name: 'Attack', stat: this.abilityStats.attack, bar: (this.abilityStats.attack/181*100)},
      {name: 'Defense', stat: this.abilityStats.defense, bar: (this.abilityStats.defense/230*100)},
      {name: 'Special Attack', stat: this.abilityStats.sp_attack, bar: (this.abilityStats.sp_attack/180*100)},
      {name: 'Special Defense', stat: this.abilityStats.sp_defense, bar: (this.abilityStats.sp_defense/230*100)},
      {name: 'Speed', stat: this.abilityStats.speed, bar: (this.abilityStats.speed/200*100)},
      {name: 'Base Stat Total', stat: bst(this.abilityStats), bar: (bst(this.abilityStats)/720*100)}
    ];
    console.log(this.dataSource)
  }

}
