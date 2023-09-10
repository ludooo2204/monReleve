import XLSX from 'xlsx'
import { Transaction } from '../Models/Transaction';


export const getData =(filepath :string):Transaction[]=>{
    const workbook = XLSX.readFile(filepath, {type: "binary",cellDates:true});
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    console.log("ws")
    console.log(ws)
    const data:string[][] = XLSX.utils.sheet_to_json(ws, {header:1});
    const transactionsDATA:string[][]=data.slice(10)
    let transactions:Transaction[]=[];
    var id: number=0;
    transactionsDATA.forEach(element => {
        const tr=new Transaction(); 
        id++
        tr.DateOpération=new Date(element[0]);
        tr.Id=id;
        tr.IntituléOpération=element[1]
        tr.MontantOpération =(element[2])!=undefined?-Number(element[2]):Number(element[3])
        transactions.push(tr)

    });
    return transactions
}
