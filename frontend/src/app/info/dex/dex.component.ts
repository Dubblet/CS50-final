import { Component, OnInit } from '@angular/core';

export interface DexEntry {
  game: string;
  entry: string;
}

const ELEMENT_DATA: DexEntry[] = [
  {game: 'Sword', entry: 'Sword dex entry'},
  {game: 'Shield', entry: 'Shield dex entry'},
  {game: 'BD', entry: 'BD dex entry'},
  {game: 'SP', entry: 'SP dex entry'}
];

@Component({
  selector: 'poke-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.css']
})
export class DexComponent implements OnInit {
  displayedColumns: string[] = ['game', 'entry'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
