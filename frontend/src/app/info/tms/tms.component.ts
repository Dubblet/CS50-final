import { Component, OnInit, Input } from '@angular/core';
import { MoveModel } from 'src/app/models/movemodel';

// public move: string = "Growl";
// public type: string = "Normal";
// public category: number = 0;
// public damage: number = 0;
// public accuracy: number = 100;
// public description: string = "Lowers the foe(s) Attack by 1.";
// public learn_lvl?: number;
// public tm?: number;
// public tr?: number;
// public tutor?: number;


@Component({
  selector: 'poke-tms',
  templateUrl: './tms.component.html',
  styleUrls: ['./tms.component.css']
})
export class TmsComponent implements OnInit {
  @Input() moves: MoveModel[] = [];

  displayedColumns: string[] = ['move', 'type', 'category', 'damage', 'accuracy', 'description', 'tm', 'tr', 'tutor'];
  dataSource: MoveModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.moves.filter(move => move.tm != null || move.tr != null || move.tutor != null);
    console.log(this.dataSource);
  }

}
