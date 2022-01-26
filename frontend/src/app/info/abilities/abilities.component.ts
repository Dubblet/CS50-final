import { Component, OnInit } from '@angular/core';

export interface Ability {
  name: string;
  detail: string;
}

const ELEMENT_DATA: Ability[] = [
  {name: 'Overgrow', detail: "When HP falls below 1/3rd of max, Grass type moves power increased by 50%"},
  {name: 'Chlorophyll', detail: "When Sunny the Pokemon's Speed doubles"},

];

@Component({
  selector: 'poke-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'detail'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
