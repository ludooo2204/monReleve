/**
 * @format
 */

import 'react-native';
import React from 'react';
import * as Help_functions from '../src/BLL/Help_functions'

// Note: import explicitly to use the types shiped with jest.
import {it, describe, expect,beforeAll} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Import} from '../src/Models/Import';
import { Transaction } from '../src/Models/Transaction';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

describe('Importation du relevé', () => {
  let result: Transaction[];

  beforeAll(() => {
    const importer = new Import('D:\\papareleve.xlsx');
    result = importer.getData();
  });
  it('doit retourner une liste de transaction vide quand le fichier n\'est pas le bon', () => {
    const importer = new Import('c:\\exemple.txt');
    const falseresult = importer.getData();
    const expected:Transaction[]=[];
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



});


