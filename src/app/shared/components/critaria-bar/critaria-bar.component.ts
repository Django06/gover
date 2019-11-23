import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _moment from "moment";
@Component({
  selector: 'app-critaria-bar',
  templateUrl: './critaria-bar.component.html',
  styleUrls: ['./critaria-bar.component.scss']
})
export class CritariaBarComponent implements OnInit {
  @Input()
  criteria: any;
  @Output()
  remove = new EventEmitter<string>();

  objectKeys = Object.keys;
  isDate = (value: any) => _moment.isDate(value);
  constructor() {
    console.log(this.criteria);
    
  }
  ngOnInit() {
    console.log(this.criteria);
  }

  removeEmiter(cr) {
    this.remove.emit(cr);
    this.criteria[cr] = undefined;
  }
}
