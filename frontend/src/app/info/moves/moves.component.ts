import { Component, OnInit, Input } from '@angular/core';
import { MoveModel } from 'src/app/models/movemodel';

@Component({
  selector: 'poke-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit {
  @Input() moves: MoveModel[] = [];

  displayedColumns: string[] = ['move', 'type', 'category', 'damage', 'accuracy', 'description', 'learn_lvl'];
  dataSource: MoveModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.moves.filter(move => move.learn_lvl != null);
  }

}
