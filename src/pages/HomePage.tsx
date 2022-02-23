// Building Offline First App in React Native using PouchDB and CouchDB
// https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/

import { gt } from 'lodash';
import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import db from '../config/config';
import { postTest, deleteTest, PutTest } from '../funcitions/Funtions';

const HomePage = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 50,
                    marginVertical: 50,
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                <Button
                    onPress={() => navigation.navigate('Sync')}
                    title="Sync Method"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={() => navigation.navigate('Changes')}
                    title="Change Method"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
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
            </View>
        </SafeAreaView>
    );
};

export default HomePage;