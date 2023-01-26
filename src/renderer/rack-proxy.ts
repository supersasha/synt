export type UpdateViewCallback = (event: any, value: any) => void;

export interface RackProxy {
    callInstance(name: string, method: string, ...args: any): Promise<any>;
    callRack(method: string, ...args: any[]): Promise<any>;
    onUpdateView(callback: UpdateViewCallback): void;
}

export interface AsyncRackInterface {
    resume(): Promise<string>;
    pause(): Promise<void>;
    viewReady(): Promise<void>;
}

export function getRack(): AsyncRackInterface {
    const rackProxy: RackProxy = (window as any).rackProxy;
    return new Proxy({}, {
        get(_target, prop: string) {
            return async (...args: any[]) => {
                return await rackProxy.callRack(prop, ...args);
            };
        }
    }) as AsyncRackInterface;
}

export interface AsyncInstanceInterface {
    getData(): Promise<Float32Array>;
    setValue(val: number): Promise<void>;
}

export function getInstance(name: string): AsyncInstanceInterface {
    const rackProxy: RackProxy = (window as any).rackProxy;
    return new Proxy({}, {
        get(_target, prop: string) {
            return async (...args: any[]) => {
                return await rackProxy.callInstance(name, prop, ...args);
            };
        }
    }) as AsyncInstanceInterface;
}

export function subscribeToViewUpdate(callback: UpdateViewCallback): void {
    const rackProxy = (window as any).rackProxy;
    rackProxy.onUpdateView(callback);
}
