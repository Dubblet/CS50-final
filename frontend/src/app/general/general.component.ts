import { Component, Input, OnInit } from '@angular/core';
import { PokeModel } from '../models/pokemodel';

const PokeTypeInfo: {[x: string]: Type} = {
  "Bug":      {name: "Bug", bgColor: "green", color: "white"},
  "Dark":     {name: "Dark", bgColor: "black", color: "white"},
  "Dragon":   {name: "Dragon", bgColor: "purple", color: "white"},
  "Electric": {name: "Electric", bgColor: "yellow", color: "black"},
  "Fairy":    {name: "Fairy", bgColor: "pink", color: "black"},
  "Fighting": {name: "Fighting", bgColor: "orange", color: "black"},
  "Fire":     {name: "Fire", bgColor: "red", color: "white"},
  "Flying":   {name: "Flying", bgColor: "red", color: "white"},
  "Ghost":    {name: "Ghost", bgColor: "purple", color: "white"},
  "Grass":    {name: "Grass", bgColor: "green", color: "white"},
  "Ground":   {name: "Ground", bgColor: "brown", color: "white"},
  "Ice":      {name: "Ice", bgColor: "blue", color: "white"},
  "Normal":   {name: "Normal", bgColor: "gray", color: "white"},
  "Poison":   {name: "Poison", bgColor: "purple", color: "white"},
  "Psychic":  {name: "Psychic", bgColor: "pink", color: "black"},
  "Rock":     {name: "Rock", bgColor: "brown", color: "white"},
  "Steel":    {name: "Steel", bgColor: "gray", color: "white"},
  "Water":    {name: "Water", bgColor: "blue", color: "white"},
};

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
  @Input() model = new PokeModel();

  parsedName: String = '';
  types: Type[] = [];


  constructor() { }

  ngOnChanges(): void {
    this.parsedName = this.model.name
      .replace(/[:. ]+/, "-")
      .replace(/[.'’]/g, "")
      .toLowerCase();


    this.types = this.model.types
      .split(',')
      .map((poketype) => PokeTypeInfo[poketype]);
    
  }

}
