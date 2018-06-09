import {Api} from "./Api";

export class EndpointController {
    protected api: Api;
    protected controllerName: string;
    protected host: string;
    
    constructor(api: Api, controllerName: string) {
        this.api = api;
        this.controllerName = controllerName;
        this.host = api.host + controllerName + "\\";
    }
}