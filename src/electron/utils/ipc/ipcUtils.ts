import {ipcMain} from 'electron';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export function registerIpcMainHandlers(
    handlers: Record<string, (event: IpcMainInvokeEvent, ...args: any[]) => any>
): void {
    Object
        .entries(handlers)
        .forEach(
            ([channel, handler]: [string, (event: IpcMainInvokeEvent, ...args: any[]) => any]) => {
                ipcMain.handle(channel, handler);
            }
        );
}
