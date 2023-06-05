import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private excel: ExcelService) {}
  fileToUpload!: File;
  nameFile!: string;

  file(event:any){
    this.fileToUpload = this.excel.onFileChange(event)
    console.log(this.fileToUpload)
    const range = { s:{r: 0, c:0}, e: {r:1, c:0}};
    this.excel.modificarArchivoExcel(this.fileToUpload, range,3)
    //this.getData()
  }

  async getData(){
    //
    //await this.excel.readFile(this.fileToUpload, rage).then((data) =>{
      //console.log(data)
    //})

  }

}
