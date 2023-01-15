// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

const rackProxy = {
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
    }
};

contextBridge.exposeInMainWorld('rackProxy', rackProxy);
