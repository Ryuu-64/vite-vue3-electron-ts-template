export type IpcMainInvoke<T extends (...args: any) => any> = (_event: Electron.IpcMainInvokeEvent, ...args: Parameters<T>) => ReturnType<T>
