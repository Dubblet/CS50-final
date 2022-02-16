import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeModel } from './models/pokemodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient) {}

  model = new PokeModel();

  ngOnInit(): void {
    this.http.get<Array<PokeModel>>("http://127.0.0.1:8001/cs50/poke_model.json?dex_num=898&_shape=array")
      .subscribe(response => {
        // console.log(response["rows"]);
        this.model = response[0];
      });
  }

}
