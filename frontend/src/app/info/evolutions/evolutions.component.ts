import { Component, OnInit } from '@angular/core';

export interface Evolutions {
  sprite: string;
  name: string;
  dexnum: number;
  method: string;
}

const ELEMENT_DATA: Evolutions[] = [
  {sprite: 'https://img.pokemondb.net/artwork/large/ivysaur.jpg', name: 'Ivysaur', dexnum: 2, method: 'Level up after level 14'},
  {sprite: 'https://img.pokemondb.net/artwork/large/venusaur.jpg', name: 'Venusaur', dexnum: 3, method: 'Level up after level 32'},
];

@Component({
  selector: 'poke-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dexnum', 'sprite', 'method'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
