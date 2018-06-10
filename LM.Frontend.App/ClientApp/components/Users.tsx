import {Api} from "../server/Api";
import {RouteComponentProps} from "react-router";
import * as React from "react";
import {User} from "../models/User";
import {NavLink} from "react-router-dom";

interface UsersState {
    users: Array<any>
}

export class Users extends React.Component<RouteComponentProps<{}>, UsersState> {
    api: Api;
    user: User;

    constructor() {
        super();
        
        this.state = {
            users: []
        };

        this.api = new Api();
        
        var app = this;

        this.api.users.get(function (response: any) {
            app.setState({
                users: response.data
            });
        });
        
        this.user = this.getUserFromCookie();
        
    }
    
    public getUserFromCookie() : User {
        function getCookie(name: any) : any {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            if (matches != null) {
                return matches ? decodeURIComponent(matches[1]) : "";
            } else return null;
        }

        var user = JSON.parse(getCookie("_user"));

        return user;
    }

    public render() {
        
        return <div>
            <h1>Пользователи</h1>
            <div className="list-group">
                {
                    this.state.users.map(user =>
                        <div>
                            <p>
                                <a className="btn btn-primary" data-toggle="collapse" href={"#" + user.Name}
                                   role="button" aria-expanded="false" aria-controls="collapseExample">
                                    {user.Name}
                                </a>
                            </p>
                            <div className="collapse" id={user.Name}>
                                <div className="card card-body">
                                    <p>Имя: {user.Name}</p>
                                    <p>Статус: { user.Role == 0 ? <a>студаент</a> : <a>Администратор</a> }</p>

                                    {
                                        this.user.role == 1 ?
                                        <button onClick={() => this.deleteUser(user)} className="btn btn-primary"
                                                type="button" data-toggle="collapse"
                                                data-target="#collapseExample" aria-expanded="false"
                                                aria-controls="collapseExample">
                                            Удалить
                                        </button>
                                            : ""
                                    }
                                    <br/>
                                    <br/>
                                </div>
                            </div>
                        </div>
                )}
            </div> 
        </div>
    }
    
    public deleteUser(user: any) {
        var app = this;
        
        this.api.users.remove(function (res: any) {
            app.api.users.get(function (response: any) {
                app.setState({
                    users: response.data
                });
            });
        }, user._id);
    }
}
