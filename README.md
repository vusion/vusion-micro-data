# vusion-micro-data

used for vusion-micro

## usage

```javascript
import { publish, subscribe, clearTopic } from 'vusion-micro-data';

publish('test', 2);
subscribe('test', (number) => {
    console.log(number === 2);
});
clearTopic('test');
```

## api

### publish

publish a topic with data, support clean data

`function (topic: string, data: any): Function`

```javascript
const cancel = publish('test', 2);
cancel();
```

### subscribe

subscribe a topic, support run once and cancel

`function (topic: string, func: Function, once?: boolean): Function`

```javascript
const cancel = subscribe('test', (data) => {
    console.log(data);
}, false);
cancel();
```

### clearTopic

clear topic queue and data

`function (topic: string, isSaveData?: boolean): void`

```javascript
clearTopic('test', false);
```
