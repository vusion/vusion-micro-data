!function(n){var e={};function t(r){if(e[r])return e[r].exports;var u=e[r]={i:r,l:!1,exports:{}};return n[r].call(u.exports,u,u.exports,t),u.l=!0,u.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var u in n)t.d(r,u,function(e){return n[e]}.bind(null,u));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){"use strict";t.r(e),t.d(e,"subscribe",(function(){return a})),t.d(e,"publish",(function(){return l})),t.d(e,"clearTopic",(function(){return d}));var r=window.__MICROAPP__&&window.$root||window,u=Symbol("vusion-micro-data-empty"),o=Symbol.for("vusion-micro-data"),i=r[o]=r[o]||{},c=function(n){i[n]||(i[n]={queue:[],last:u})},f=function(){},a=function(n,e,t){c(n);var r=i[n],o=function(n){var e=r.queue;e.includes(n)&&e.splice(e.indexOf(n),1)};if(r.last!==u&&(e(r.last),t))return f;var a=function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];e.apply(void 0,n),o(a)};return r.queue.push(t?a:e),function(){return o(e)}},l=function(n,e){c(n);var t=i[n];return t.queue.forEach((function(n){n(e)})),t.last=e,function(){t.last=u}},d=function(n,e){var t=i[n];t&&(t.queue.length=0),e||(t.last=u)}}]);