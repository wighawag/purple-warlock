import { writable } from 'svelte/store';
import {client, NAMES, NAMES_SUBSCRIPTION } from '../graphql';

function wait(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t * 1000);
    });
}

const $data = {};
const { subscribe, set } = writable($data);

function _set(data) {
    Object.assign($data, data);
    set($data);
}

let dataStore;
export default dataStore = {
  subscribe,
  preload: async () => {
    try {
        const data = await client.query({
            query: NAMES
        });
        return {data: data.data};
    } catch (e) {
        console.error(e);
    }
    return {data: null};
  },
  restore: (data) => {
    client.writeQuery({query: NAMES, data});
    // const restoredData = client.readQuery({query: NAMES});
    _set({status: 'loaded', data: data.namedEntities.map(item => item.name)})
  },
  load: async () => {
    let sub = await client.subscribe({
        query: NAMES_SUBSCRIPTION
    }); 
    // let sub = await client.watchQuery({
    //     query: NAMES,
    //     pollInterval : 1000
    // }); 
    sub.subscribe(
        {
            next: (obj) => _set({status: 'loaded', data: obj.data.namedEntities.map(item => item.name)}),
            error: (...args) => console.log('error', ...args),
            complete: (...args) => console.log('complete', ...args),
        }
    )
  }
};

if (typeof window !== 'undefined') {
    window.names = $data;
}
if (process.browser) {
    dataStore.load();
}

