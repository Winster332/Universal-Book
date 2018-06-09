import {ApiApp} from "./ApiApp";

export class Api {
    public host: string;
    public app: ApiApp;
    
    constructor(host: string = "http://localhost:5000/api/") {
        this.host = host;
        
        this.app = new ApiApp(this);
    }
}