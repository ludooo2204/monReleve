import {DeclarationDepense} from './DeclarationDepense';
import {Solde} from './Solde';
import {Transaction} from './Transaction';

export class Synthese {
  /**
   *
   */
  constructor(transactions: Transaction[]) {
    this.Transactions = transactions;
    this.DeclarationsDepenses = [];
  }
  private Transactions: Transaction[];
  public DeclarationsDepenses: DeclarationDepense[];
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
    this.DeclarationsDepenses.push(depense);
  }
  ///

  checkDeclarations() {
    let uncheckedTransactions = this.Transactions.filter(
      t => t.Validation == false,
    );
    let uncheckedDeclaration = this.DeclarationsDepenses;
    let matchedTransactions: any[] = [];
    uncheckedTransactions.forEach(element => {
      uncheckedDeclaration.forEach(decla => {
        if (Math.abs(decla.Montant) == Math.abs(element.MontantOpération))
          matchedTransactions.push({transaction: element, declaration: decla});
      });
    });
    return {uncheckedTransactions, uncheckedDeclaration, matchedTransactions};
  }

  ConfirmDeclaration(
    confirmTransaction: Transaction,
    confirmedDeclaration: DeclarationDepense,
  ) {
    let indexDeclarationToDelete: number = this.DeclarationsDepenses.findIndex(
      d =>
        d.Montant == confirmedDeclaration.Montant &&
        d.Tag == confirmedDeclaration.Tag,
    );

    this.DeclarationsDepenses.splice(indexDeclarationToDelete, 1);
    let tr= this.Transactions.find(t => t.Id == confirmTransaction.Id);
    tr.Validation=true;

  }
}
