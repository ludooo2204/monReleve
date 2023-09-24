/**
 * @format
 */

import 'react-native';
import React from 'react';
import * as Help_functions from '../src/BLL/Help_functions';

// Note: import explicitly to use the types shiped with jest.
import {it, describe, expect, beforeAll} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Import} from '../src/Models/Import';
import {Transaction} from '../src/Models/Transaction';
import {Synthese} from '../src/Models/Synthese';
import {Solde} from '../src/Models/Solde';
import {DeclarationDepense} from '../src/Models/DeclarationDepense';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

describe('Importation du relevé', () => {
  let result: Transaction[];
  let solde: Number;

  beforeAll(() => {
    const importer = new Import('D:\\papareleve.xlsx');
    result = importer.getTransactions();
    solde = importer.getSolde();
  });
  it("doit retourner une liste de transaction vide quand le fichier n'est pas le bon", () => {
    const importer = new Import('c:\\exemple.txt');
    const falseresult = importer.getTransactions();
    const expected: Transaction[] = [];
    expect(falseresult).toHaveLength(0);
  });

  it('doit retourner une liste de transaction non vide', () => {
    expect(result).not.toHaveLength(0);
  });

  it('doit contenir uniquement des objets de type Transaction', () => {
    const isAllTransactions = result.every(item => item instanceof Transaction);
    expect(isAllTransactions).toBe(true);
  });

  it('doit retourner toutes les transactions', () => {
    expect(result).toHaveLength(298);
  });
  it('doit retourner le bon solde', () => {
    expect(solde).toEqual(11093.38);
  });
});

describe('Synthese', () => {
  let synthese: Synthese;
  let montantSolde: number;
  let soldes: Solde[];

  beforeAll(() => {
    const importer = new Import('D:\\papareleve.xlsx');
    const result = importer.getTransactions();
    montantSolde = importer.getSolde();
    synthese = new Synthese(result);
    soldes = synthese.getSuiviSolde(montantSolde);
  });

  it(' getDepenses doit retourner le bon total de dépense', () => {
    expect(Math.floor(synthese.getDepenses())).toEqual(20152);
  });

  it("getEntreeArgent doit retourner la bonne rentrée d'argent totale", () => {
    expect(Math.floor(synthese.getEntreeArgent())).toEqual(20237);
  });

  it('getDepensesTransactions doit retourner la bonne liste de debit', () => {
    expect(synthese.getDepensesTransactions()).toHaveLength(254);
  });
  it("getEntreeTransactions doit retourner la bonne liste d'entree d'argent", () => {
    expect(synthese.getEntréeTransactions()).toHaveLength(44);
  });

  it(' GetSuiviSolde doit retourner le bon nombre de soldes', () => {
    expect(soldes).toHaveLength(299);
  });

  it(' GetSuiviSolde doit retourner les soldes dans le bon ordre', () => {
    expect(soldes[0].Date.getTime()).toBeGreaterThan(
      soldes[soldes.length - 1].Date.getTime(),
    );
  });

  it(' GetSuiviSolde doit retourner les bons montants 1', () => {
    expect(Math.floor(soldes[0].Montant)).toEqual(11093);
  });
  it(' GetSuiviSolde doit retourner les bons montants 2', () => {
    expect(Math.floor(soldes[3].Montant)).toEqual(10926);
  });
  it('MontantSolde - getDepense + getEntreeArgent doit etre equivalent au plus vieux solde de getSuiviSolde', () => {
    const depense = synthese.getDepenses();
    const entreeArgent = synthese.getEntreeArgent();
    const montantSoldeLePlusVieux = soldes[soldes.length - 1].Montant;
    const montantSoldeLePlusVieuxAttendu =
      montantSolde + entreeArgent - depense;
    const soldeString = soldes.map(s => s.Montant);
    expect(Math.round(montantSoldeLePlusVieux)).toEqual(
      Math.round(montantSoldeLePlusVieuxAttendu),
    );
  });
});

describe('Declaration Depense', () => {
  let synthese: Synthese;
  let declarationDepense: DeclarationDepense;

  beforeAll(() => {
    const importer = new Import('D:\\papareleve.xlsx');
    const result = importer.getTransactions();
    synthese = new Synthese(result);
    declarationDepense = new DeclarationDepense(new Date(), 'carburant C4', 85);
    synthese.declarerDepenses(declarationDepense);
    declarationDepense = new DeclarationDepense(
      new Date(),
      'carburant adam',
      56.8,
    );
    synthese.declarerDepenses(declarationDepense);
    declarationDepense = new DeclarationDepense(
      new Date(),
      'carburant adam',
      50,
    );
    declarationDepense.Confirmation = true;
    synthese.declarerDepenses(declarationDepense);
    console.log('declarationDepense');
    console.log(declarationDepense);
  });

  it(' Synthese doit enregistrer les depense declarées', () => {
    expect(synthese.DeclarationsDepenses).not.toBeNull();
  });

  it(' Synthese doit enregistrer le bon nombre de depenses declarées', () => {
    console.log(synthese.DeclarationsDepenses);
    expect(synthese.DeclarationsDepenses).toHaveLength(3);
  });
  it(' CheckDeclarations ne doit pas etre null', () => {
    const uncheckTransactionsAndDeclaration: [
      Transaction,
      DeclarationDepense,
    ][] = synthese.checkDeclarations();
    expect(uncheckTransactionsAndDeclaration).not.toBeNull();
  });

  it(' CheckDeclarations doit retourner les transactions non confirmées ', () => {
    const uncheckTransactionsAndDeclaration: [
      Transaction,
      DeclarationDepense,
    ][] = synthese.checkDeclarations();
    expect(uncheckTransactionsAndDeclaration[1]).toHaveLength(2);
  });

  it(' CheckDeclarations doit retourner les declarations du meme montant ', () => {
    const uncheckTransactionsAndDeclaration: [
      Transaction,
      DeclarationDepense,
    ][] = synthese.checkDeclarations();
    const transactionsNonTraitées = uncheckTransactionsAndDeclaration[0];
    const declarationNonTraitées = uncheckTransactionsAndDeclaration[1];
    console.log("transactionsNonTraitées")
    console.log(transactionsNonTraitées)
    console.log(transactionsNonTraitées[0])
        console.log("declarationNonTraitées")
    console.log(declarationNonTraitées)
    // expect(transactionsNonTraitées.includes(tr=>tr.)).toHaveLength(2);
  });


});
