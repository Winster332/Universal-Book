import {RouteComponentProps} from "react-router";
import * as React from "react";
import {Part} from "../models/Part";
import {Api} from "../server/Api";

interface CreateNewPartState {
    name: string;
    achievementsName: string;
}

export class CreateNewPart extends React.Component<RouteComponentProps<{}>, CreateNewPartState> {
    api: Api;
    
    constructor() {
        super();
        
        this.api = new Api();
    }

    public render() {
        return <div>
            <h1>Создание нового параграфа</h1>
            <label htmlFor="exampleInputPassword1">Название</label>
            <input onChange={e => this.inputChangeNameHandle(e)} className="form-control" type="text" id="username" placeholder="name"></input>
            <label htmlFor="exampleInputPassword1">Награда</label>
            <input onChange={e => this.inputChangeAchievementsHandle(e)} className="form-control" type="text" id="username" placeholder="achievements"></input>
            <br/>
            <button onClick={ () => this.createNew() } type="button" className="btn btn-primary">Создать</button>
        </div>;
    }

    inputChangeNameHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            name: event.currentTarget.value
        })
    }
    
    inputChangeAchievementsHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            achievementsName: event.currentTarget.value
        })
    }
    
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    public createNew() {
        var part = new Part();
        part.themes = [];
        part.name = this.state.name;
        part.achievement = this.state.achievementsName;
        part.id = this.guid();
        
        var app = this;
        
        this.api.parts.create(function (r: any) {
            app.props.history.push("/");
        }, part);
    }
}
