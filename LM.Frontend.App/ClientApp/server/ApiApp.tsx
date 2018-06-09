import {Api} from "./Api";
import {EndpointController} from "./EndpointController";

export class ApiApp extends EndpointController {
    constructor(api: Api) {
        super(api, "app")
    }
    
    public getVersion(callback: Function, state: any) {
        fetch(this.host + "version")
            .then(res => res.json())
            .then((result) => callback(result, state))
    }
    
    public getName(callback: Function, state: any) {
        fetch(this.host + "name")
            .then(res => res.json())
            .then((result) => callback(result, state))
    }
    
    public getAuthor(callback: Function, state: any) {
        fetch(this.host + "author")
            .then(res => res.json())
            .then((result) => callback(result, state))
    }
    
    public getContacts(callback: Function, state: any) {
        fetch(this.host + "contacts")
            .then(res => res.json())
            .then((result) => callback(result, state))
    }
}