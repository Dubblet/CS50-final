import { Component, Input, OnInit } from '@angular/core';

export interface Type {
  name: string;
  bgColor: string;
  color: string;
}

@Component({
  selector: 'poke-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {
  @Input() name!: String
  parsedName: String = '';
  types: Type[] = [
    {name: 'Grass', bgColor: "green", color: "white"},
    {name: 'Posion', bgColor: "purple", color: "white"},
  ];

  constructor() { }

  ngOnChanges(): void {
    this.parsedName = this.name.replace(/[:. ]+/, "-").replace(/[.'’]/g, "").toLowerCase();
  }

}
