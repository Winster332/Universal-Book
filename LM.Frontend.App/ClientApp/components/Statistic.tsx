import {User} from "../models/User";
import {RouteComponentProps} from "react-router";
import * as React from "react";

interface StatisticState {
    user: User;
}

export class Statistic extends React.Component<RouteComponentProps<{}>, StatisticState> {
    constructor() {
        super();
        
        this.state = {
            user: this.getUserFromCookie()
        };
        console.log(this.state.user);
    }

    public render() {
        return <div>
            <br/>
            <button onClick={ () => this.backToProfile() } type="button" className="btn btn-primary">К профилю</button>
            
            <h1>Ваши достижения</h1>
            {
                this.state.user.achievements == undefined ? <p>У вас пока нет достижений</p> :
                this.state.user.achievements.map(element =>
                    <p>{element}</p>
                )
            }
        </div>
    }
    
    public getUserFromCookie() {
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
    
    public backToProfile() {
        this.props.history.push("/profile")
    }
}
