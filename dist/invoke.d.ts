interface Request {
    body?: any;
    headers?: any;
    query?: any;
}
declare const _default: (name: string, request?: Request) => Promise<{
    body: any;
    status: any;
}>;
export default _default;
