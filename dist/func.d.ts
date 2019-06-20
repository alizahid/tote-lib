import { Context, HttpRequest } from '@azure/functions';
interface Constructable {
    new (context: Context, request: HttpRequest): any;
}
export default class Func {
    context: Context;
    request: {
        body: any;
        headers: any;
        query: any;
    };
    schema?: any;
    constructor(context: Context, request: HttpRequest);
    status(status: number): this;
    send(body: object): this;
    invoke(): object | void;
    validate(): void;
    static bootstrap(Func: Constructable): (context: Context, request: HttpRequest) => Promise<void>;
}
export {};
