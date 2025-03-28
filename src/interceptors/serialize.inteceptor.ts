import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

export class SerializerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        console.log('I am running before the handler', context);

        return handler.handle().pipe(
            map((data: any) => {
                console.log('I am running before sending the response', data);
            })
        );
    }
}