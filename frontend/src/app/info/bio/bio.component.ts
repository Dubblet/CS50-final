import { Component, OnInit } from '@angular/core';

export interface Bio {
  classification: string;
  height: number;
  weight: number;
  gender_ratio: string;
}

const ELEMENT_DATA: Bio[] = [
  {classification: 'Seed', height: 0.7, weight: 6.9, gender_ratio: 'M - 88.14% / F - 11.86%'},
];

@Component({
  selector: 'poke-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  displayedColumns: string[] = ['classification', 'height', 'weight', 'gender_ratio'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}