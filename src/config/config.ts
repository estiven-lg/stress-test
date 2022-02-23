// Building Offline First App in React Native using PouchDB and CouchDB
// https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/

import PouchDB from 'pouchdb-react-native';
import PouchAuth from 'pouchdb-authentication';
import PouchDB2 from './SQLiteAdapter';

const localDB = new PouchDB2('docs');
// Please update the CouchDB URL in case of any change
// Here "/docs" is the my database name
// You can change it with your own database name
const remoteDB = new PouchDB(
    'http://0.0.0.0:5984/docs',
    {
        skip_setup: true,
        retry: true,

    }
);
PouchDB.plugin(PouchAuth);
let sync: any
sync = localDB.sync(remoteDB, {
    live: true,
    retry: true,
    batch_size: 100,

});
const syncStates = [
    'change',
    'paused',
    'active',
    'denied',
    'complete',
    'error',
];
const syncro = (): void => {
    syncStates.forEach((state) => {
        sync.on(state, () => {
            setCurrentState(state);
        })
    });
}
function setCurrentState(state: string): void {
    console.log('[Sync:' + state + ']');
}
function iniciar() {
    syncro();

    remoteDB.login('admin', 'admin').then(function () {
    }).catch((err: any) => {
        console.log(err, 'reintentando logear')
        setTimeout(() => iniciar(), 5000)
    })
}
iniciar()
// Please update the username and password of the couchDB


export default { localDB, sync };