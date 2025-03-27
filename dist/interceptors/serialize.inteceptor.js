"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializerInterceptor = void 0;
const operators_1 = require("rxjs/operators");
class SerializerInterceptor {
    intercept(context, handler) {
        console.log('I am running before the handler', context);
        return handler.handle().pipe((0, operators_1.map)((data) => {
            console.log('I am running before sending the response', data);
        }));
    }
}
exports.SerializerInterceptor = SerializerInterceptor;
//# sourceMappingURL=serialize.inteceptor.js.map