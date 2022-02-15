import { Component, OnInit, Input } from '@angular/core';
import { PokeModel } from 'src/app/models/pokemodel';
import { parseName } from 'src/app/helpers/helpers';

export interface Evolutions {
  sprite: string;
  name: string;
  dexnum: string;
  method: string[];
}

@Component({
  selector: 'poke-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent {
  @Input() model = new PokeModel();
  displayedColumns: string[] = ['dexnum', 'name', 'method', 'sprite'];
  dataSource: Evolutions[] | null = [];

  constructor() { }

  ngOnChanges(): void {
    if (this.model.evo_data) {
      this.dataSource = this.model.evo_data
        .split(';')
        .map((evoInfo) => evoInfo.split('|'))
        .map((evo) => { 
          let form = evo[0].split(':')[1]
          let dexnum = evo[1].split(':')[1]
          // console.log(evo)
          let ways: string[] = ["Base Form"]
          if (evo.length > 2) {
            ways = evo[2].split(',')
            .map((way) => way.split(':')[1])
          }
          return {sprite: parseName(form), name: form, dexnum: dexnum, method: ways}
        });
      }
      else {this.dataSource = null}
  }

}
