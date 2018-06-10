import {User} from "../models/User";
import {RouteComponentProps} from "react-router";
import * as React from "react";

interface UserInfoState {
    user: User;
}


export class UserInfo extends React.Component<RouteComponentProps<{}>, UserInfoState> {
    constructor() {
        super();
        
        console.log(this.props)
    }

    public render() {
        return <div>
            <h1>Добро пожаловать</h1>
        </div>
    }
}

