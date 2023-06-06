import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private data: DataService) {}
  meses = this.data.meses

}
