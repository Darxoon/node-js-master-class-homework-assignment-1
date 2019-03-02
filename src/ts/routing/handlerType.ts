import HandlerData from "./handlerData";

export type Handler = (data: HandlerData, callback: (statusCode?: number, payload?: {}) => void) => void