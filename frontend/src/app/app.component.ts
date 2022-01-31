import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit(): void {
    this.http.get<any>("http://localhost:8001/cs50/pokemon/1.json?_shape=objects")
      .subscribe(response => {
        // console.log(response["rows"]);
        let rows = response["rows"];
        this.name = rows[0]["name"];
        this.dexnum =  rows[0]["dex_num"].toString().padStart(3, "0");
      });
  }

}
