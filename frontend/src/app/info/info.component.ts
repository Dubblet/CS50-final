import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'poke-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() dexnum!: String;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // this.http.get<any>("http://localhost:8001/cs50/pokemon/1.json?_shape=objects")
    //   .subscribe(response => {
    //     // console.log(response["rows"]);
    //     let rows = response["rows"];
    //     this.name = rows[0]["name"];
    //     this.dexnum =  rows[0]["dex_num"].toString().padStart(3, "0");
    //   });
  }
}
