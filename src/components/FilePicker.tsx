import React, { useState } from 'react'
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
import * as Help_functions from '../BLL/Help_functions'
import { Transaction } from '../Models/Transaction';
import { Synthese } from '../Models/Synthese';
const FilePicker = () => {
    const [pickedDocument, setPickedDocument] = useState(null);
    console.log("cava?");
    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.xlsx],
        });
  
        console.log('File URI:', result[0].uri);
        // Convert the URI to a full path
        const filePath = result[0].uri.replace('file://', ''); // Remove 'file://' prefix
        console.log('Full Path:', filePath);
        
        const correctFilePath = await RNFS.readFile(filePath, "ascii");
        let transactions:Transaction[]= Help_functions.getData(correctFilePath);
console.log("transactions")
// console.log(transactions)
let synthese=new Synthese();
synthese.transactions=transactions;
let depense=synthese.getDepenses()
let entree=synthese.getEntreeArgent()
console.log("depense")
console.log(depense)
console.log("entree")
console.log(entree)
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
export default FilePicker
