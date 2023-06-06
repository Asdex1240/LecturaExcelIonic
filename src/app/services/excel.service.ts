import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  hayArchivo = false;
  archivoExel!: File

  constructor() { }
  onFileChange(event: any) {
    this.hayArchivo = true;
    return event.target.files[0];
  }

  readFile(numHoja: number):Promise<any> {
    return new Promise( (resolve, reject) =>{
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(this.archivoExel);
      fileReader.onload = (e) =>{
        const workbook = XLSX.read(fileReader.result,{type:'binary'});
        const sheetNames = workbook.SheetNames;
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[numHoja]])
        resolve(data)
      };
      fileReader.onerror = (e) =>{
        reject(e)
      }
    });
  }

    /*async modificarArchivoExcel(archivo: File, celda: any, nuevoValor: any): Promise<any> {
      try {
        const data = await this.readFile(archivo, celda);
        // Modificamos el valor de la celda especificada con el nuevo valor
        data[0][0] = nuevoValor;
    
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
    
        // Guardamos el archivo modificado en la misma ubicación sobrescribiendo el archivo existente
        const wbout: ArrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        console.log(url)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', archivo.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error al leer el archivo Excel:', error);
      }
    }*/
    
      
      
}
