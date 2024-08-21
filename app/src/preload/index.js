/* eslint-disable prettier/prettier */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI
    })
    contextBridge.exposeInMainWorld('electron', {
      closeApp: () => ipcRenderer.send('close-app'),
      minimizeApp: () => ipcRenderer.send('minimize-app'),
    });
  } catch (error) {
    console.error(error)
  }
} 
  else {
  window.electron = { 
    ...electronAPI, 
    closeApp: () => ipcRenderer.send('close-app'), 
    minimizeApp: () => ipcRenderer.send('minimize-app') 
  }

  window.api = api
}
