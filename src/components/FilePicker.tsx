import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import * as Help_functions from '../BLL/Help_functions';
import {Transaction} from '../Models/Transaction';
import {Synthese} from '../Models/Synthese';
import { Import } from '../Models/Import';
const FilePicker = () => {
  const [pickedDocument, setPickedDocument] = useState(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });

      // Convert the URI to a full path
      const filePath = result[0].uri.replace('file://', ''); // Remove 'file://' prefix

      const correctFilePath = await RNFS.readFile(filePath, 'ascii');
      // let transactions: Transaction[] = Help_functions.getData(correctFilePath);
    const importer = new Import(correctFilePath);
    const transactions = importer.getTransactions();
    const solde = importer.getSolde();
    let synthese = new Synthese(transactions);
    const suivi = synthese.getSuiviSolde(solde);
    let depense = synthese.getDepenses();
    let entree = synthese.getEntreeArgent();
    const depensetransactions =synthese.getDepensesTransactions();
    const getEntréeTransactions =synthese.getEntréeTransactions();
    console.log('transactions');
    console.log(transactions)
    console.log("solde")
    console.log(solde)
    console.log("suivi")
    console.log(suivi)
      console.log('depense');
      console.log(depense);
      console.log('entree');
      console.log(entree);
      console.log('depensetransactions');
      console.log(depensetransactions);
      console.log('getEntréeTransactions');
      console.log(getEntréeTransactions);


    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };
  return (
    <View>
      <Button title="Pick a Document" onPress={pickDocument} />
      {pickedDocument && (
        <View>
          <Text>Selected File: </Text>
        </View>
      )}
    </View>
  );
};
export default FilePicker;
