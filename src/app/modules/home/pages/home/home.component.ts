import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moduleName-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string = 'app'

  constructor() { }

  ngOnInit() {
  }

}
