var empty = Symbol.for('vusion-micro-data-empty');
var key = Symbol.for('vusion-micro-data');
var topics;
var initTopic = function (topic) {
    if (!topics) {
        var g = function () {
            if (window.__MICROAPP__) {
                return window.$root || window;
            }
            return window;
        }();
        topics = g[key] = g[key] || {};
    }
    if (!topics[topic]) {
        topics[topic] = {
            queue: [],
            last: empty,
        };
    }
};
// eslint-disable-next-line @typescript-eslint/no-empty-function
var noop = function () { };
export var subscribe = function (topic, func, once) {
    initTopic(topic);
    var current = topics[topic];
    var cancel = function (func) {
        var queue = current.queue;
        if (queue.includes(func))
            queue.splice(queue.indexOf(func), 1);
    };
    if (current.last !== empty) {
        func(current.last);
        if (once) {
            return noop;
        }
    }
    var cancelWrap = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        func.apply(void 0, args);
        cancel(cancelWrap);
    };
    current.queue.push(once ? cancelWrap : func);
    return function () { return cancel(func); };
};
export var publish = function (topic, data) {
    initTopic(topic);
    var current = topics[topic];
    current.queue.forEach(function (func) {
        func(data);
    });
    current.last = data;
    return function () {
        current.last = empty;
    };
};
export var clearTopic = function (topic, isSaveData) {
    var current = topics[topic];
    if (current) {
        current.queue.length = 0;
        if (!isSaveData) {
            current.last = empty;
        }
    }
};
