import { Component, OnInit, Input } from '@angular/core';
import { PokeModel } from '../models/pokemodel';

@Component({
  selector: 'poke-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() model = new PokeModel();

  padNum = "025";

  constructor() { }

  ngOnChanges(): void {
    this.padNum = this.model.dex_num.toString().padStart(3, "0");
  }

}
