import {Api} from "./Api";
import {EndpointController} from "./EndpointController";
import {User} from "../models/User";
import axios from 'axios';

export class ApiUser extends EndpointController {
    constructor(api: Api) {
        super(api, "users")
    }
    
    public create(callback: Function, user: User) {
        axios.post(this.host + "create", user)
            .then(function (response) {
                callback(response);
            }) 
        
        // fetch(this.host + "createNew", {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user)
        // }).then(() => {
        //     console.log("user created")
        // });
    }
    
    public login(callback: Function, user: User) {
        axios.post(this.host + "login", user)
            .then(function (response) {
                callback(response);
            }) 
    }
}