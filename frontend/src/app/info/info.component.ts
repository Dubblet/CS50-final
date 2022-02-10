import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input} from '@angular/core';
import { PokeModel } from '../models/pokemodel';

@Component({
  selector: 'poke-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() model = new PokeModel();

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }
}
