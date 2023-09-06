import { Transaction } from "./Transaction";

export class Synthese {
  transactions:Transaction[];
  getDepenses() : number{
    let depense:number=0;
    
    this.transactions.forEach(element => {
    
        if (element.MontantOpération<0)    depense+=element.MontantOpération
    });
    return depense;
  }
  getEntreeArgent() : number{
    let entree:number=0;
    
    this.transactions.forEach(element => {
       if (element.MontantOpération>0) entree+=element.MontantOpération
    });
    return entree;
  }
}