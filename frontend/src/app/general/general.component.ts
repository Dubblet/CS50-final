import { Component, OnInit } from '@angular/core';

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
export class GeneralComponent implements OnInit {

  types: Type[] = [
    {name: 'Grass', bgColor: "green", color: "white"},
    {name: 'Posion', bgColor: "purple", color: "white"},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
