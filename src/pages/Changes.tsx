// Building Offline First App in React Native using PouchDB and CouchDB
// https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Switch,
    Dimensions,
    Button
} from 'react-native';
import db from '../config/config';
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider
} from 'recyclerlistview';
import Loading from '../components/Loading';
import { useFocusEffect } from '@react-navigation/native';
import { deleteTest, postTest, PutTest } from '../funcitions/Funtions';

const renderDoc = (type: any, item: any): any => {
    return (
        <View
            style={{
                padding: 16,
                marginVertical: 10,
                // backgroundColor: 'white',
                borderColor: '#E8E8E8',
                borderWidth: 1,
                borderBottomColor: '#D4D4D4',
                borderBottomWidth: 1,
                borderRadius: 2,
            }}
            key={item._id}>
            <Text >Id: {item._id}</Text>
            <Text >Name: {item.name}</Text>
            <Text >Contact: {item.contact}</Text>
            <Text >Address: {item.address}</Text>
        </View>
    );
};


const Changes: React.FC = () => {
    let [docs, setDocs]: any = useState([]);
    let [isLoading, setLoading] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useFocusEffect(
        React.useCallback(() => {
            let Cambios = db.localDB.changes({
                live: true,
                retry: true,
                since: 'now',
                include_docs: true,
                ascending: true,
            }).on('change', (change: any) => {
                let doc = change.doc;
                if (!doc) return;
                if (doc._deleted) {
                    removeDoc(doc);
                } else {
                    addDoc(doc);
                }
                console.log('se hizo un cambio usando Change()')
            })
            db.localDB.allDocs({ include_docs: true })
                .then((results: any) => {
                    let temp = results.rows.map((row: any) => row.doc);
                    setDocs(temp);
                    setLoading(false);
                })
                .catch((err: any) => {
                    console.log('Error in fetching data: ', err);
                    setLoading(false);

                });
            return () => {
                Cambios.cancel();
            };
        }, [])
    );


    const addDoc = (newDoc: any) => {
        setDocs((docs: any) => {
            if (!docs.find(element => element._id === newDoc._id)) {
                return docs.concat(newDoc);
            } else {
                console.log('add no')
                const newData = docs.map((item: any) => (
                    item._id === newDoc._id ? newDoc : item
                ));
                return [...newData]
            }
        });
    };

    const removeDoc = (oldDoc: any) => {
        setDocs((docs: any) => docs.filter(
            (doc: any) => doc._id !== oldDoc._id)
        );
    };


    const dataProviderMaker = (data) => new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);
    const memoizedValue: any = useMemo(() => dataProviderMaker(docs), [docs]);
    const ViewTypes = {
        FULL: 0,
        HALF_LEFT: 1,
        HALF_RIGHT: 2,
    };
    let { width } = Dimensions.get('window');
    const layoutMaker = () =>
        new LayoutProvider(
            (index) => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 160;
            }
        );
    const _layoutProvider = useRef(layoutMaker()).current;
    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{ flex: 1, padding: 16 }}>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text>Mostrar lista</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <Text>Numero de documentos:{docs.length}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

                    <Button
                        onPress={() => postTest()}
                        title="Post Test"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        onPress={() => deleteTest()}
                        title="Delete Test"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        onPress={() => PutTest()}
                        title="Put Test"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View >
                {
                    isEnabled ?
                        <RecyclerListView
                            layoutProvider={_layoutProvider}
                            dataProvider={memoizedValue}
                            rowRenderer={renderDoc}
                        />

                        :
                        <View />
                }
            </View>
        </SafeAreaView>
    );
}


export default Changes;
