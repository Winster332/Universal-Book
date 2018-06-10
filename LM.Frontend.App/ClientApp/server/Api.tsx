import {ApiApp} from "./ApiApp";
import {ApiUser} from "./ApiUser";

export class Api {
    public host: string;
    public app: ApiApp;
    public users: ApiUser;
    
    constructor(host: string = "http://localhost:5000/api/") {
        this.host = host;
        
        this.app = new ApiApp(this);
        this.users = new ApiUser(this);
    }
}