import { Component, OnInit } from '@angular/core';

export interface BaseStats {
  name: string;
  stat: string;
  bar: number;
}

const ELEMENT_DATA: BaseStats[] = [
  {name: 'HP', stat: '45', bar: (45/255*100)},
  {name: 'Attack', stat: '49', bar: (45/181*100)},
  {name: 'Defense', stat: '49', bar: (45/230*100)},
  {name: 'Special Attack', stat: '65', bar: (45/180*100)},
  {name: 'Special Defense', stat: '65', bar: (45/230*100)},
  {name: 'Speed', stat: '45', bar: (45/200*100)},
  {name: 'Base Stat Total', stat: '318', bar: (318/720*100)}
];

@Component({
  selector: 'poke-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'stat', 'bar'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
