import { subscribe, publish, clearTopic } from '../src/index';

test('subscribe & publish', (): void => {
    let a = 1;
    subscribe('test', (b) => {
        a = b;
        expect(a).toBe(2);
    });
    publish('test', 2);
});

test('subscribe once & publish', (): void => {
    let a = 1;
    subscribe('test1', (b) => {
        a = b;
    }, true);
    publish('test1', 2);
    publish('test1', 3);
    setTimeout(() => {
        expect(a).toBe(2);
    }, 1000);
});

test('publish & subscribe', (): void => {
    let a = 1;
    publish('test3', 2);
    subscribe('test3', (b) => {
        a = b;
        expect(a).toBe(2);
    });
});

test('publish & subscribe once', (): void => {
    let a = 1;
    publish('test4', 2);
    subscribe('test4', (b) => {
        a = b;
        expect(a).toBe(2);
    }, true);
    publish('test4', 5);
});

test('publish & subscribe cancel', (): void => {
    let a = 1;
    publish('test5', 2);
    const cancel = subscribe('test5', (b) => {
        a = b;
        expect(a).toBe(2);
    });
    cancel();
    publish('test5', 5);
});

test('publish & subscribe mutil', (): void => {
    let a = 1;
    publish('test6', 2);
    subscribe('test6', (b) => {
        a = b;
        expect(a).toBe(2);
    });
    subscribe('test6', (b) => {
        a = b;
        expect(a).not.toBe(3);
        expect(a).toBe(2);
    });
});

test('publish cancel & subscribe', (): void => {
    let a = 1;
    const cancel = publish('test7', 2);
    subscribe('test7', (b) => {
        a = b;
        expect(a).toBe(2);
    });
    cancel();
    subscribe('test7', () => {
        throw new Error('works');
    });
});

test('clearTopic', (): void => {
    let a = 1;
    publish('test8', 2);
    subscribe('test8', () => {
        a++;
    });
    subscribe('test8', () => {
        a++;
    });
    clearTopic('test8');
    subscribe('test8', () => {
        a++;
    });
    expect(a).toBe(3);
});

test('clearTopic saveData', (): void => {
    let a = 1;
    publish('test9', 2);
    subscribe('test9', () => {
        a++;
    });
    subscribe('test9', () => {
        a++;
    });
    clearTopic('test9', true);
    subscribe('test9', () => {
        a++;
    });
    expect(a).toBe(4);
});