// // Building Offline First App in React Native using PouchDB and CouchDB
// // https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/

// import React, { useState, useEffect, useMemo,PureComponent } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   Alert,
//   FlatList,
//   Switch
// } from 'react-native';

// // import _ from 'lodash';
// // import Mybutton from './components/Mybutton';
// import db from './src/config/config';

// const renderDoc = ({item}): any => {
//   return (
//     <View
//       style={{
//         padding: 16,
//         marginVertical: 10,
//         backgroundColor: 'white',
//         borderColor: '#E8E8E8',
//         borderWidth: 1,
//         borderBottomColor: '#D4D4D4',
//         borderBottomWidth: 1,
//         borderRadius: 2,
//       }}
//       key={item._id}>
//       <Text style={{ color: '#000' }}>Id: {item._id}</Text>
//       <Text style={{ color: '#000' }}>Name: {item.name}</Text>
//       <Text style={{ color: '#000' }}>Contact: {item.contact}</Text>
//       <Text style={{ color: '#000' }}>Address: {item.address}</Text>
//       {/* <Mybutton
//         title="Remove"
//         customClick={() => onDocRemove(doc)}
//       /> */}
//     </View>
//   );
// };


// const App: React.FC = () => {
//   let [docs, setDocs]: any = useState([]);
//   let [inputDoc, setInputDoc] = useState('');
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//   useEffect(() => {
//     db.remoteDB.allDocs({ include_docs: true })
//       .then((results: any) => {
//         let temp = results.rows.map((row: any) => row.doc);
//         setDocs(temp);
//         addLiveUpdateListner();
//       })
//       .catch((err: any) => {
//         console.log('Error in fetching data: ', err);
//         addLiveUpdateListner();
//       });
//     // addLiveUpdateListner();

//   }, []);
//   const array_change = async (change: any) => {
//     console.log(':D', change);
//     setDocs((docs3: any) => {


//       let docsChanges = change.change.docs;
//       // console.log(change)
//       let newDocs = docs3;

//       docsChanges.forEach((doc: any) => {
//         // console.log(doc)
//         if (!doc) return;
//         if (doc._deleted) {
//           // console.log('delete doc => ', doc);
//           // removeDoc(doc);
//           newDocs = newDocs.filter(
//             (doc1: any) => doc1._id !== doc._id)
//           // console.log('remove',newDocs,)
//         } else {
//           // console.log('add doc => ', doc);
//           // addDoc(doc);
//           // console.log('add')
//           if (!newDocs.find(element => element._id === doc._id)) {
//             // if (!_.find(newDocs, { _id: doc._id })) {
//               console.log('adddiin')
//             // newDocs.concat(doc);
//             newDocs=[...newDocs,doc]
//             // newDocs.push(doc)


//           } else {
//             // console.log('add no')
//             const newData = newDocs.map((item: any) => (
//               item._id === doc._id ? doc : item
//             ));
//             newDocs = newData
//           }
//         }
//       })


//       console.log('complete App', change)
//       // setDocs([...newDocs])
//       return newDocs
//     })
//   }
//   const addLiveUpdateListner = () => {
//     // db.sync.on('change', (change: any) => {
//     //   array_change(change)
//     //   //   })
//     // })

//     // db.remoteDB.changes({
//     //   live: true,
//     //   retry: true,
//     //   since: 'now',
//     //   include_docs: true,
//     //   style:'all_docs',
//     //   ascending: true,
//     //   batch_size:1,
//     // })
//     //   .on('change', (change: any) => {
//     //     // console.log('[Change:Change]', change);
//     //     let doc = change.doc;
//     //     // console.log(change)
//     //     if (!doc) return;
//     //     if (doc._deleted) {
//     //       // console.log('delete doc => ', doc);
//     //       removeDoc(doc);
//     //       console.log('remove')
//     //     } else {
//     //       // console.log('add doc => ', doc);
//     //       addDoc(doc);
//     //       console.log('add')

//     //     }
//     //     console.log('complete App', change)
//     //   })
//     //   .on(
//     //     'complete',
//     //     // console.log.bind(console, '[Change:Complete]')
//     //     () => console.log('completee')
//     //   )
//     //   .on(
//     //     'error',
//     //     // console.log.bind(console, '[Change:Error]')
//     //     (err:any) => console.log('errorr',err)

//     //   )
//     //   .on('paused',()=>console.log('pausaa'))
//   };

//   const addDoc = (newDoc: any) => {
//     setDocs((docs: any) => {
//       if (!docs.find(element => element._id === newDoc._id)) {
//         // return [...docs,newDoc]
//         return docs.concat(newDoc);
//         // const result : any[] = [];
//         // console.log('add yes')

//         // setDocs(result)
//       } else {
//         console.log('add no')
//         const newData = docs.map((item: any) => (
//           item._id === newDoc._id ? newDoc : item
//         ));
//         return [...newData]
//       }
//     });
//   };

//   const removeDoc = (oldDoc: any) => {
//     setDocs((docs: any) => docs.filter(
//       (doc: any) => doc._id !== oldDoc._id)
//     );
//   };

//   // const onDocSubmit = () => {
//   //   db.post({name: inputDoc, contact: '', address: ''})
//   //     .then((doc:any) => {
//   //       console.log('doc', doc);
//   //       if (!doc.ok) {
//   //         // alert('Insertion Failed');
//   //         return;
//   //       }
//   //       setInputDoc('');
//   //     })
//   //     .catch((error:any) => console.log('Error Inserting -> ' + error));
//   // };

//   // const onDocRemove = (oldDoc:any) => {
//   //   db.remove(oldDoc)
//   //     .then((doc:any) => {
//   //       console.log('doc', doc);
//   //       if (!doc.ok) {
//   //         // alert('Removal Failed');
//   //         return;
//   //       }
//   //     })
//   //     // .catch((error:any) => alert('Error -> ' + error));
//   // };
//   const memoizedValue = useMemo(() => renderDoc, [docs]);




//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         <View style={{ flexDirection: 'row' }}>
//           <TextInput
//             style={{
//               flex: 1,
//               borderColor: 'black',
//               height: 40,
//               borderWidth: 0.5,
//               marginTop: 14,
//               backgroundColor: 'white',
//               padding: 10,
//               color: '#000'
//             }}
//             placeholder="Enter Name"
//             onChangeText={(inputDoc) => setInputDoc(inputDoc)}
//             value={inputDoc}
//           />

//         </View>
//         <View style={{display:'flex',flexDirection:'row'}}>
//           <Text>Mostrar lista</Text>
//           <Switch
//             trackColor={{ false: "#767577", true: "#81b0ff" }}
//             thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//             ios_backgroundColor="#3e3e3e"
//             onValueChange={toggleSwitch}
//             value={isEnabled}
//           />
//         </View>
//         <Text>Numero de documentos:{docs.length}</Text>
//         {
//           isEnabled?
//           <FlatList
//           data={docs}
//           initialNumToRender={10}
//           windowSize={5}
//           maxToRenderPerBatch={5}
//           updateCellsBatchingPeriod={30}
//           removeClippedSubviews={false}
//           onEndReachedThreshold={0.1}
//           renderItem={renderDoc}
//         />
//         :
//         <View/>
//         }
//         {/* <FlatList
//         data={docs}
//         renderItem={renderDoc}
//         keyExtractor={item => item._id}
//       /> */}
//         {/* <ScrollView>
//           {docs.map((doc: any, index: number) => renderDoc(doc, index))}
//         </ScrollView> */}
//       </View>
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   //containerForm
//   containerForm: {
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 10,
//     marginTop: 40,
//     backgroundColor: '#EEEEEE',
//   },

//   //containerStatus
//   containerStatus: {
//     backgroundColor: 'red',
//     height: 20,
//     marginBottom: 20,
//     borderRadius: 20,
//   },

//   //Status Text
//   statusText: {
//     color: 'white',
//     flexDirection: 'row',
//     textAlign: 'center',
//   },

//   //containerList
//   containerList: {
//     paddingLeft: 10,
//     paddingRight: 10,
//   },

//   //Separator - Add form/List
//   separator: {
//     height: 0,
//     backgroundColor: 'aliceblue',
//   },
// });
// export default App;
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Sync from './src/pages/Sync';
import Changes from './src/pages/Changes';
import HomePage from './src/pages/HomePage';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: '#009999', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Changes"
          component={Changes}
          options={{
            title: 'Metodo Change()', //Set Header Title
            headerStyle: {
              backgroundColor: '#009999', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Sync"
          component={Sync}
          options={{
            title: 'Methodo Sync()', //Set Header Title
            headerStyle: {
              backgroundColor: '#009999', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;