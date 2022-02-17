import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeModel } from '../models/pokemodel';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  model = new PokeModel();

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = param['id'];
      console.log(param)
      this.http.get<Array<PokeModel>>(`http://127.0.0.1:8001/cs50/poke_model.json?dex_num=${id}&_shape=array`)
      .subscribe(response => {
        this.model = response[0];
      });
    });
  }

}