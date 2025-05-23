import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
    new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor{
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}