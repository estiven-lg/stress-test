
import React, { useState, useEffect, useMemo, PureComponent, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    Alert,
    FlatList,
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
const renderDoc = (type, item): any => {
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


const Sync: React.FC = () => {
    let [docs, setDocs]: any = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    let [isLoading, setLoading] = useState(true);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    useFocusEffect(
        React.useCallback(() => {
            db.localDB.allDocs({ include_docs: true })
                .then((results: any) => {
                    let temp = results.rows.map((row: any) => row.doc);
                    setDocs(temp);
                    setLoading(false);
                    addLiveUpdateListner();
                })
                .catch((err: any) => {
                    console.log('Error in fetching data: ', err);
                    setLoading(false);
                    addLiveUpdateListner();
                });
            return () => {
                db.sync.removeListener('change', array_change)
            };
        }, [])
    );

    const array_change = async (change: any) => {
        setDocs((docs3: any) => {
            let docsChanges = change.change.docs;
            let newDocs = docs3;
            docsChanges.forEach((doc: any) => {
                if (!doc) return;
                if (doc._deleted) {
                    newDocs = newDocs.filter(
                        (doc1: any) => doc1._id !== doc._id)
                } else {
                    if (!newDocs.find(element => element._id === doc._id)) {
                        newDocs = [...newDocs, doc]
                    } else {
                        const newData = newDocs.map((item: any) => (
                            item._id === doc._id ? doc : item
                        ));
                        newDocs = newData;
                    }
                }
            })
            return newDocs;
        })
    }
    const addLiveUpdateListner = () => {
        db.sync.on('change', array_change)
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
                <View style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-around' }}>

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


const styles = StyleSheet.create({
    //containerForm
    containerForm: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginTop: 40,
        backgroundColor: '#EEEEEE',
    },

    //containerStatus
    containerStatus: {
        backgroundColor: 'red',
        height: 20,
        marginBottom: 20,
        borderRadius: 20,
    },

    //Status Text
    statusText: {
        color: 'white',
        flexDirection: 'row',
        textAlign: 'center',
    },

    //containerList
    containerList: {
        paddingLeft: 10,
        paddingRight: 10,
    },

    //Separator - Add form/List
    separator: {
        height: 0,
        backgroundColor: 'aliceblue',
    },
});
export default Sync;
