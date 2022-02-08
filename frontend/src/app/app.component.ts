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

  title = 'frontend';
  pokeId = 1;
  name = 'Pikachu';
  dexnum = "1".padStart(3, "0");

  model = new PokeModel();

  ngOnInit(): void {
    this.http.get<Array<PokeModel>>("http://127.0.0.1:8001/cs50/front_page.json?dex_num=1&_shape=array")
      .subscribe(response => {
        // console.log(response["rows"]);
        this.model = response[0];
      });
  }

}

// {
//   "database": "cs50",
//   "table": "pokemon",
//   "rows": [
//     {
//       "id": 772,
//       "dex_num": 772,
//       "name": "Type: Null"
//     }
//   ],
//   "columns": [
//     "id",
//     "dex_num",
//     "name"
//   ],
//   "primary_keys": [
//     "id"
//   ],
//   "primary_key_values": [
//     "772"
//   ],
//   "units": {},
//   "query_ms": 1.204991014674306
// }
