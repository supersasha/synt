export function getRack(): any {
    const rackProxy = (window as any).rackProxy;
    return new Proxy({}, {
        get(_target, prop) {
            return async (...args: any[]) => {
                return await rackProxy.callRack(prop, ...args);
            };
        }
    });
}

export function getInstance(name: string): any {
    const rackProxy = (window as any).rackProxy;
    return new Proxy({}, {
        get(_target, prop) {
            return async (...args: any[]) => {
                return await rackProxy.callInstance(name, prop, ...args);
            };
        }
    });
}
