import {Transaction} from '../Models/Transaction';
import XLSX from 'xlsx';

export class Import {
  private filepath: string;

  constructor(_filepath: string) {
    this.filepath = _filepath;
  }

  getData = (): Transaction[] => {
    try {
      const workbook = XLSX.readFile(this.filepath, {
        type: 'binary',
        cellDates: true,
      });
      
      return getTransactions(workbook);
    } catch (error) {
        return [];
    }

      function getTransactions(workbook:XLSX.WorkBook) {
          const wsnames = workbook.SheetNames;
          const wsname = workbook.SheetNames[0];
          const ws = workbook.Sheets[wsname];
          const data: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
          const transactionsDATA: string[][] = data.slice(10);
          let transactions: Transaction[] = [];
          var id: number = 0;
          transactionsDATA.forEach(element => {
            const dateValue:Date =new Date(element[0]);
            if (!isNaN(dateValue.getTime())) {
                // La conversion en date est réussie, donc c'est une date valide.
                const tr = new Transaction();
                id++;
                tr.DateOpération = dateValue;
                tr.Id = id;
                tr.IntituléOpération = element[1];
                tr.MontantOpération =
                    element[2] != undefined ? -Number(element[2]) : Number(element[3]);
                transactions.push(tr);
              } else {
                // Ce n'est pas une date valide, vous pouvez gérer le cas d'erreur ici.
              }
          });
          return transactions;
      }
  };
}
