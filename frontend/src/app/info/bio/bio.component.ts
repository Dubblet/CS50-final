import { Component, OnInit, Input } from '@angular/core';
import { PokeModel } from 'src/app/models/pokemodel';

export interface Bio {
  classification: string;
  egg_groups: string;
  height: number;
  weight: number;
  gender_ratio: number;
}

@Component({
  selector: 'poke-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent {
  @Input() model = new PokeModel();
  
  displayedColumns: string[] = ['classification', 'egg_groups', 'height', 'weight', 'gender_ratio'];
  dataSource: Bio[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.dataSource = [{
      classification: this.model.classification,
      egg_groups: this.model.egg_groups,
      height: this.model.height,
      weight: this.model.weight,
      gender_ratio: this.model.gender_ratio
    }];
  }

}