import {Api} from "../server/Api";
import {RouteComponentProps} from "react-router";
import * as React from "react";
import {Theme} from "../models/Theme";

interface PageState {
    theme: Theme;
    
}

export class Page extends React.Component<RouteComponentProps<{}>, PageState> {
    api: Api;

    constructor() {
        super();
        
        this.state = {
            theme: new Theme()
        };

        this.api = new Api();
        
        var theme = this.getThemeFromCookie();
        var themeId = theme.id;
        
        var app = this;
        
        this.api.parts.getPartByThemeId(function (th: any) {
            console.log(th)
            var theme = new Theme();
            theme.id = th._id;
            theme.partId = th.PartId;
            theme.achievement = th.Achievement;
            theme.task = th.Name;
            theme.name = th.Name;
            theme.content = th.Content;

            app.setState({
                theme: theme
            });
        }, themeId);
    }

    public render() {
        return <div>
            <h1>Добро пожаловать</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Математика</a></li>
                    <li className="breadcrumb-item"><a href="/">Параграфы</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{this.state.theme.name}</li>
                </ol>
            </nav>
            <p>
                {this.state.theme.content}
            </p>
        </div>
    }
    
    public getThemeFromCookie() {
        function getCookie(name: any) : any {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            if (matches != null) {
                return matches ? decodeURIComponent(matches[1]) : "";
            } else return null;
        }

        var user = JSON.parse(getCookie("_currentThemeId"));

        return user;
    }
}
