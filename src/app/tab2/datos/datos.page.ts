import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  constructor(private data: DataService, private excel: ExcelService, private activatedRoute: ActivatedRoute) {
  }
  mes!: string
  cols = this.data.gastosCol
  dataCol = []
  ngOnInit() {
    this.mes = this.activatedRoute.snapshot.paramMap.get('id') as string; 
    if(this.excel.archivoExel){
      const mesExcel = this.data.meses.indexOf(this.mes);
      console.log(mesExcel)
    }else{
      console.log('No hay Archivo')
    }
  }

}
