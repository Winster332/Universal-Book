import {Api} from "./Api";
import {EndpointController} from "./EndpointController";
import axios from 'axios';
import {Part} from "../models/Part";

export class ApiPart extends EndpointController {
    constructor(api: Api) {
        super(api, "parts")
    }

    public create(callback: Function, part: Part) {
        axios.post(this.host + "create", part)
            .then(function (response) {
                callback(response);
            })
    }

    public update(callback: Function, part: Part) {
        axios.post(this.host + "update", part)
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

    public getPart(callback: Function, partId: string) {
        axios.get(this.host + partId)
            .then(function (response) {
                callback(response);
            })
    }

    public remove(callback: Function, partId: string) {
        axios.get(this.host + "remove/" + partId)
            .then(function (response) {
                callback(response);
            })
    }
}
