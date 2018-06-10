import {Api} from "../server/Api";
import {RouteComponentProps} from "react-router";
import * as React from "react";

export class Page extends React.Component<RouteComponentProps<{}>, {}> {
    api: Api;

    constructor() {
        super();

        this.api = new Api();
    }

    public render() {
        return <div>
            <h1>Добро пожаловать</h1>
        </div>
    }
}
