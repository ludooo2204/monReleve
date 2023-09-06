/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { PermissionsAndroid } from 'react-native';
import FilePicker from './src/components/FilePicker';


type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    requestStoragePermission();
    // readDownloadDirectoryAsync(RNFS.DownloadDirectoryPath+"/Releve")
    // readExternalStorageDirectoryAsync(RNFS.DocumentDirectoryPath)
  
    
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Coucou</Text>
      <FilePicker />
      <Text>Coucou2</Text>

{/* 
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;


async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to storage to read files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to storage to read files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use RNFS.readDir to read the directory
    } else {
      console.log('Storage permission denied');
    }
  } catch (error) {
    console.warn(error);
  }
}
// async function readDownloadDirectoryAsync(directoryPath:string) {
//   if (Platform.OS === 'web') {
//     // Handle web environment differently
//     // You might use browser APIs or other libraries here
//     console.log('Running on web environment');
//   } else {
//     // Use the asynchronous method from react-native-fs
//     try {
//       console.log(directoryPath)
//       const result = await RNFS.readDir(directoryPath);
//       console.log('Directory contents:', result);
//     } catch (error) {
//       console.error('Error reading directory:', error);
//     }
//   }
// }
// async function readExternalStorageDirectoryAsync(directoryPath:string) {

//     // Use the asynchronous method from react-native-fs
//     try {
//       const result = await RNFS.readDir(directoryPath);
//       console.log('Directory contents:', result);
//     } catch (error) {
//       console.error('Error reading directory:', error);
//     }
// }

