declare global {
    interface Window {
        $root: Window;
        __MICROAPP__: boolean;
    }
}
const g = function (): Window{
    if (window.__MICROAPP__) {
        return window.$root || window;
    }
    return window;
}();
const empty = Symbol('vusion-micro-data-empty');
const key = Symbol.for('vusion-micro-data');
const topics = g[key] = g[key] || {};

const initTopic = function (topic: string): void {
    if (!topics[topic]) {
        topics[topic] = {
            queue: [],
            last: empty,
        };
    } 
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = function(): void{};
export const subscribe = function (topic: string, func: Function, once?: boolean): Function {
    initTopic(topic);
    const current = topics[topic];
    const cancel = function (func): void {
        const queue = current.queue;
        if (queue.includes(func))
            queue.splice(queue.indexOf(func), 1);
    }
    if (current.last !== empty) {
        func(current.last);
        if (once) {
            return noop;
        }
    }
    const cancelWrap = function (...args): void {
        func(...args);
        cancel(cancelWrap);
    };
    current.queue.push(once ? cancelWrap: func);

    return (): void => cancel(func);
};
export const publish = function (topic: string, data: any): Function {
    initTopic(topic);
    const current = topics[topic];
    current.queue.forEach((func) => {
        func(data);
    });
    current.last = data;
    return function(): void {
        current.last = empty;
    };
};
export const clearTopic = function(topic: string, isSaveData?: boolean): void {
    const current = topics[topic];
    if (current) {
        current.queue.length = 0;
        if (!isSaveData) {
            current.last = empty;
        }
    }
};
