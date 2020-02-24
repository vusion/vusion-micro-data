declare global {
    interface Window {
        $root: Window;
        __MICROAPP__: boolean;
    }
}
export declare const subscribe: (topic: string, func: Function, once?: boolean) => Function;
export declare const publish: (topic: string, data: any) => Function;
export declare const clearTopic: (topic: string, isSaveData?: boolean) => void;
