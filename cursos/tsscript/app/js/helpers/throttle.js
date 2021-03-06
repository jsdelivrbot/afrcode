System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function throttle(delay = 500) {
        return function (target, propertyKey, descriptor) {
            const cur = descriptor.value;
            let timer = 0;
            descriptor.value = function (...args) {
                clearInterval(timer);
                timer = setTimeout(() => cur.apply(this, args), delay);
            };
            return descriptor;
        };
    }
    exports_1("throttle", throttle);
    return {
        setters: [],
        execute: function () {
        }
    };
});
