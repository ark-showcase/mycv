"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializerInterceptor = void 0;
exports.Serialize = Serialize;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new SerializerInterceptor(dto));
}
class SerializerInterceptor {
    constructor(dto) {
        this.dto = dto;
    }
    intercept(context, handler) {
        return handler.handle().pipe((0, operators_1.map)((data) => {
            return (0, class_transformer_1.plainToClass)(this.dto, data, {
                excludeExtraneousValues: true,
            });
        }));
    }
}
exports.SerializerInterceptor = SerializerInterceptor;
//# sourceMappingURL=serialize.inteceptor.js.map