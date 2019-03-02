import HandlerData from "./handlerData";
import { Handler } from "./handlerType";
import { handlers } from "./handlers";

export let router: {[key: string]: Handler} = {
    'ping': handlers.ping, 
    'hello': handlers.hello
}