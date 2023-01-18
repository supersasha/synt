// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { RackProxy } from './rack-proxy';

const rackProxy: RackProxy = {
    callInstance(name: string, method: string, ...args: any) {
        return ipcRenderer.invoke('rack', {
            request: 'callInstance',
            params: {
                name,
                method,
                args
            }
        });
    },
    callRack(method: string, ...args: any[]) {
        return ipcRenderer.invoke('rack', {
            request: 'callRack',
            params: {
                method,
                args
            }
        });
    },
    onUpdateView(callback: (event: any, value: any) => void) {
        ipcRenderer.on('update-view', (ev, view) => {
            console.log('update-view event arrived to ipcRenderer');
            callback(ev, view);
        });
    }
};

contextBridge.exposeInMainWorld('rackProxy', rackProxy);
