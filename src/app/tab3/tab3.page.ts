import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private excel: ExcelService, private data: DataService ) {}

  fileToUpload!: File;
  nameFile!: string;

  file(event:any){
    this.excel.archivoExel = this.excel.onFileChange(event)
    
    this.getData()
  }
  
  async getData(){
    const numHoja = 0
    const data = await this.excel.readFile(numHoja);
    console.log(data)
  }

}
