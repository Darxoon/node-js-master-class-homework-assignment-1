import { UrlWithParsedQuery } from "url";
import { ParsedUrlQuery } from "querystring";
import { IncomingHttpHeaders } from "http";

export default 
class HandlerData {
    
    path: string; 
    queryStringObject: ParsedUrlQuery; 
    method: string; 
    header: IncomingHttpHeaders; 
    payload: string;

    constructor(path: string, queryStringObject: ParsedUrlQuery, method: string, header: IncomingHttpHeaders, payload: string) {
        this.path = path;
        this.queryStringObject = queryStringObject;
        this.method = method;
        this.header = header;
        this.payload = payload;
    }
}