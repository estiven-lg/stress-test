// import { useState } from 'react';
import { Alert } from 'react-native';
import db from '../config/config';

export function postTest() {
    let num: number = 2000;//numero de prueba
    let contador = 0;
    Alert.alert(
        'en proceso',
        `Post test en proceso con ${num} documentos`,
        [],
        { cancelable: false },
    );

    for (let index = 0; index < num; index++) {

        db.localDB.post({
            name: " userFrom App " + index,
            contact: "userContact App",
            address: "userAddress App",
        })
            .then((doc) => {
                if (!doc.ok) {
                    console.log('Registration Failed');
                    return;
                } else {
                    console.log('documento subido', doc);
                }
                contador = (contador + 1);
                if (contador === (num - 1)) {
                    Alert.alert(
                        'Success',
                        'You are Registered Successfully',
                        [
                            {
                                text: 'Ok',
                            },
                        ],
                        { cancelable: false },
                    );
                }
            })
            .catch((error) => {
                contador = (contador + 1)
                if (contador === num) {
                    Alert.alert(
                        'Success',
                        'Post test finalizado',
                        [
                            {
                                text: 'Ok',
                            },
                        ],
                        { cancelable: false },
                    );
                }

                console.log('Error Inserting -> ' + error)
            });
    };

};
export function deleteTest() {
    let num: number = 2000;//numero de prueba
    let contador = 0;
    Alert.alert(
        'en proceso',
        `Delete test en proceso con ${num} documentos`,
        [],
        { cancelable: false },
    );
    db.localDB.allDocs({ include_docs: true })
        .then((results: any) => {
            for (let index = 0; index < num; index++) {
                if (!results.rows[index]) {
                    console.log("break", [index]);
                    contador = (contador + 1)
                    if (contador === num) {
                        Alert.alert(
                            'Success',
                            'Delete test finalizado',
                            [
                                {
                                    text: 'Ok',
                                },
                            ],
                            { cancelable: false },
                        );
                    }
                }else{
                db.localDB.remove(results.rows[index].doc)
                    .then((doc) => {
                        if (!doc.ok) {
                            console.log('Deletion Failed');
                            return;
                        } else {
                            console.log('documento borrado desde el telefono', doc);
                        }
                        contador = (contador + 1)
                        if (contador === num) {
                            Alert.alert(
                                'Success',
                                'Delete test finalizado',
                                [
                                    {
                                        text: 'Ok',
                                    },
                                ],
                                { cancelable: false },
                            );
                        }

                    })
                    .catch((error) => {
                        contador = (contador + 1)
                        if (contador === num) {
                            Alert.alert(
                                'Success',
                                'Delete test finalizado',
                                [
                                    {
                                        text: 'Ok',
                                    },
                                ],
                                { cancelable: false },
                            );
                        }

                        console.log('Error Inserting -> ' + error)
                    });
                }
            };
        })



};
export function PutTest() {
    let num: number = 2000;//numero de prueba
    let contador = 0;
    Alert.alert(
        'en proceso',
        `Put test en proceso con ${num} documentos`,
        [],
        { cancelable: false },
    );
    db.localDB.allDocs({ include_docs: true })
        .then((results: any) => {

            for (let index = 0; index < num; index++) {
                if (!results.rows[index]) {
                    console.log("break", [index]);
                    contador = (contador + 1)
                    if (contador === num) {
                        Alert.alert(
                            'Success',
                            'Put test finalizado',
                            [
                                {
                                    text: 'Ok',
                                },
                            ],
                            { cancelable: false },
                        );
                    }
                } else {
                    console.log(results.rows[index])
                    const newDoc = {
                        ...results.rows[index].doc,
                        name: " UpdateFrom App " + index,
                        contact: "UpdateContact",
                        address: "UpdateAddress",
                    }

                    db.localDB.put(newDoc)
                        .then((doc) => {
                            if (!doc.ok) {
                                console.log('Deletion Failed');
                                return;
                            } else {
                                console.log('documento borrado desde el telefono', doc);
                            }
                            contador = (contador + 1)
                            if (contador === num) {
                                Alert.alert(
                                    'Success',
                                    'Put test finalizado',
                                    [
                                        {
                                            text: 'Ok',
                                        },
                                    ],
                                    { cancelable: false },
                                );
                            }

                        })
                        .catch((error) => {
                            contador = (contador + 1)
                            if (contador === num) {
                                Alert.alert(
                                    'Success',
                                    'Put test finalizado',
                                    [
                                        {
                                            text: 'Ok',
                                        },
                                    ],
                                    { cancelable: false },
                                );
                            }

                            console.log('Error Inserting -> ' + error)
                        });
                }
            };
        })
}