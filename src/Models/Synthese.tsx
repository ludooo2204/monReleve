import { DeclarationDepense } from './DeclarationDepense';
import {Solde} from './Solde';
import {Transaction} from './Transaction';

export class Synthese {
  
 
  /**
   *
   */
  constructor(transactions: Transaction[]) {
    this.Transactions = transactions;
    this.DeclarationsDepenses= [];
  }
  private Transactions: Transaction[];
  public DeclarationsDepenses :DeclarationDepense[];
  getDepenses(): number {
    let depense: number = 0;

    this.Transactions.forEach(element => {
      if (element.MontantOpération < 0) depense += element.MontantOpération;
    });
    return -depense;
  }
  getEntreeArgent(): number {
    let entree: number = 0;

    this.Transactions.forEach(element => {
      if (element.MontantOpération > 0) entree += element.MontantOpération;
    });
    return entree;
  }
  getDepensesTransactions(): Transaction[] {
    let depenseTransactions: Transaction[] = [];
    this.Transactions.forEach(element => {
      if (element.MontantOpération < 0) depenseTransactions.push(element);
    });
    return depenseTransactions;
  }
  getEntréeTransactions(): Transaction[] {
    let entreeTransactions: Transaction[] = [];
    this.Transactions.forEach(element => {
      if (element.MontantOpération > 0) entreeTransactions.push(element);
    });
    return entreeTransactions;
  }

  getSuiviSolde(lastSolde: number): Solde[] {
    let evolutionSolde: Solde[] = [];
    let transactions: Transaction[] = this.Transactions;
    let montantSolde: number = lastSolde;
    let lastTransaction: Transaction = transactions[0];
    let solde: Solde = new Solde(lastTransaction.DateOpération, montantSolde);

    evolutionSolde.push(solde);

    this.Transactions.forEach(transaction => {
      montantSolde += transaction.MontantOpération;
      let solde: Solde = new Solde(transaction.DateOpération, montantSolde);
      evolutionSolde.push(solde);
    });
    return evolutionSolde;
  }



  declarerDepenses(depense: DeclarationDepense) {
this.DeclarationsDepenses.push(depense)
  }
///

  checkDeclarations(): [Transaction, DeclarationDepense][] {
    
    return [this.Transactions.filter(t=>t.Validation==false),this.DeclarationsDepenses.filter(dep=>dep.Confirmation==false)]
  }

}
