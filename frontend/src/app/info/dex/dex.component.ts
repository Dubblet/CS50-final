import { Component, OnInit, Input } from '@angular/core';
import { PokeModel } from 'src/app/models/pokemodel';

export interface DexEntry {
  game: string;
  entry: string;
}

@Component({
  selector: 'poke-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.css']
})
export class DexComponent {
  @Input() model = new PokeModel();
  displayedColumns: string[] = ['game', 'entry'];
  dataSource: DexEntry[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.dataSource = this.model.dex_entries
      .split(';')
      .map((gameEntry) => gameEntry.split(':'))
      .map((game) => {
        return {game: game[0], entry: game[1]}
      });
  }

}
