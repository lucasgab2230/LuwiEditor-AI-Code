import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  getStoreValue: (key: string) => ipcRenderer.invoke('get-store-value', key),
  setStoreValue: (key: string, value: any) => ipcRenderer.invoke('set-store-value', key, value),
  deleteStoreValue: (key: string) => ipcRenderer.invoke('delete-store-value', key),
});
