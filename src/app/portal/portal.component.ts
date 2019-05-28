import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("test5");
    this.http.get('http://localhost:4000/authrequired', { withCredentials: true}).subscribe(res => {
      console.log("test");
    });
  }

}
