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
    }
    
    public update(callback: Function, user: User) {
        axios.post(this.host + "update", user)
            .then(function (response) {
                callback(response);
            })
    }
    
    public get(callback: Function) {
        axios.get(this.host)
            .then(function (response) {
                callback(response);
            })
    }
    
    public getUser(callback: Function, userId: string) {
        axios.get(this.host + userId)
            .then(function (response) {
                callback(response);
            })
    }
    
    public remove(callback: Function, userId: string) {
        axios.get(this.host + "remove/" + userId)
            .then(function (response) {
                callback(response);
            })
    }
    
    public login(callback: Function, user: User) {
        axios.post(this.host + "login", user)
            .then(function (response) {
                callback(response);
            }) 
    }
}