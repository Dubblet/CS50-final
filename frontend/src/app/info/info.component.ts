import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input} from '@angular/core';
import { PokeModel } from '../models/pokemodel';
import { AbiliStats } from '../models/abilistats';

@Component({
  selector: 'poke-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() model = new PokeModel();
  
  abilityStats = new AbiliStats();

  constructor(private http: HttpClient) { }
  ngOnChanges(): void {
    this.http.get<Array<AbiliStats>>(`http://127.0.0.1:8001/cs50/abili_stats.json?dex_num=${this.model.dex_num}&_shape=array`)
    .subscribe(response => {
      this.abilityStats = response[0];
    });
  }
}
