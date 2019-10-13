import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {
  @Input() properties: JSON;

  constructor() { }

  ngOnInit() {
  }

}
