import {Api} from "../server/Api";
import {RouteComponentProps} from "react-router";
import * as React from "react";
import {Theme} from "../models/Theme";

interface PageState {
    theme: Theme;
    userResult: string;
}

export class Page extends React.Component<RouteComponentProps<{}>, PageState> {
    api: Api;

    constructor() {
        super();
        
        this.state = {
            theme: new Theme(),
            userResult: ""
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
            theme.task = th.Task;
            theme.name = th.Name;
            theme.content = th.Content;

            app.setState({
                theme: theme
            });
        }, themeId);
    }

    public render() {
        return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Математика</a></li>
                    <li className="breadcrumb-item"><a href="/">Параграфы</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{this.state.theme.name}</li>
                </ol>
            </nav>
            <h1>{this.state.theme.name}</h1>
            <p>
                {this.state.theme.content}
            </p>
            {/*<p>*/}
                {/*<a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button"*/}
                   {/*aria-expanded="false" aria-controls="collapseExample">*/}
                    {/*Задание*/}
                {/*</a>*/}
            {/*</p>*/}
            {/*<div className="collapse" id="collapseExample">*/}
                {/*<div className="card card-body">*/}
                    {/*<p className="h4">Награда: "{this.state.theme.achievement}"</p>*/}
                    {/*<p className="h3">Решите следующее:</p>*/}
                    {/*<var>{this.state.theme.task}</var>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<label htmlFor="exampleInputPassword1">Ваш ответ</label>*/}
                    {/*<input onChange={e => this.inputChangeResultHandle(e)} className="form-control" type="text" id="username" placeholder="result"></input>*/}
                    {/*<br/>*/}
                    {/*<a onClick={() => this.setResult()} className="btn btn-primary" role="button">Ответить</a>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<a className="btn btn-primary" role="button">Узнать решение</a>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    }
    
    public setResult() {
        var result = this.state.userResult;
    }
    
    inputChangeResultHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            userResult: event.currentTarget.value
        })
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
