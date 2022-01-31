import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'poke-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() name!: string;
  @Input() dexnum!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
