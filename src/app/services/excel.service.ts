import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  hayArchivo = false;

  constructor() { }
  onFileChange(event: any) {
    this.hayArchivo = true;
    return event.target.files[0];
  }

  /*
    Rango debe seguir esta estructura 
    { s: { r: numero, c: numero }, e: { r: numero, c: numero } }
  */
    readFile(file: any, rango: any): Promise<any> {
      // Creamos una nueva promesa
      return new Promise((resolve, reject) => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          const bstr: string = e.target.result;
          const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
          const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
          const range = rango;
          const data = XLSX.utils.sheet_to_json(worksheet, { range, header: 1 });
          console.log(data)
          // Resolvemos la promesa con los 
          resolve(data);
        };
        // Manejamos el caso de error
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsBinaryString(file);
      });
    }

    async modificarArchivoExcel(archivo: File, celda: any, nuevoValor: any): Promise<any> {
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
    }
    
      
      
}
