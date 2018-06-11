import {Api} from "../server/Api";
import {RouteComponentProps} from "react-router";
import * as React from "react";
import {Theme} from "../models/Theme";
import {Part} from "../models/Part";

interface CreateNewThemeState {
    name: string;
    content: string;
    achievementsName: string;
    parts: Array<any>;
    partNameTarget: string;
    task: string;
}

export class CreateNewTheme extends React.Component<RouteComponentProps<{}>, CreateNewThemeState> {
    api: Api;

    constructor() {
        super();

        this.api = new Api();
        
        this.state = {
            name: "",
            content: "",
            achievementsName: "",
            parts: [],
            partNameTarget: "",
            task: ""
        };
        
        var app = this;

        this.api.parts.get(function (res: any) {
            var parts = res.data;
            app.setState({
                parts: parts
            });
        });
    }

    public render() {
        return <div>
            <h1>Тема</h1>

            <label htmlFor="exampleInputPassword1">Название</label>
            <input onChange={e => this.inputChangeNameHandle(e)} className="form-control" type="text" id="username" placeholder="name"></input>
            <br/>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Параграф</label>
                <select onChange={e => this.inputChangePartHandle(e)} className="form-control" id="exampleFormControlSelect1">
                    {
                        this.state.parts.map(part =>
                            <option value={part.Name}>{part.Name}</option>
                    )}
                </select>
            </div>
            <br/>
            <div className="form-group">
                <label htmlFor="comment">Контент:</label>
                <textarea className="form-control" rows={28} id="comment" onChange={e => this.inputChangeContentHandle(e)}></textarea>
            </div>
            
            {/*<p>*/}
                {/*<a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button"*/}
                   {/*aria-expanded="false" aria-controls="collapseExample">*/}
                    {/*Добавить проверочный тест*/}
                {/*</a>*/}
            {/*</p>*/}
            {/*<div className="collapse" id="collapseExample">*/}
                {/*<div className="card card-body">*/}
                    {/*<label htmlFor="exampleInputPassword1">Награда за выполнение</label>*/}
                    {/*<input onChange={e => this.inputChangeAchievementsHandle(e)} className="form-control" type="text" id="username" placeholder="achievements name"></input>*/}
                    {/*<br/>*/}
                    {/*<label htmlFor="exampleInputPassword1">Задание</label>*/}
                    {/*<input onChange={e => this.inputChangeTaskHandle(e)} className="form-control" type="text" id="username" placeholder="task"></input>*/}
                {/*</div>*/}
            {/*</div>*/}
            
            <hr/>
            
            <button onClick={ () => this.cancle() } type="button" className="btn btn-primary">Отменить</button> 
            <a> или </a> 
            <button onClick={ () => this.createNew() } type="button" className="btn btn-primary">Создать</button>
            <br/>
            <br/>
        </div>;
    }
    
    inputChangeNameHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            name: event.currentTarget.value
        })
    }
    
    inputChangePartHandle(event: any) {
        var unsafeSearchTypeValue = ((event.target) as any).value;
        
        this.setState({
            partNameTarget: unsafeSearchTypeValue
        })
    }
    
    inputChangeTaskHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            task: event.currentTarget.value
        })
    }
    
    inputChangeAchievementsHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            achievementsName: event.currentTarget.value
        })
    }
    
    inputChangeContentHandle(event: any) {
        this.setState({
            content: event.currentTarget.value
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
    
    public cancle() {
        this.props.history.push("/");
    }
    
    public createNew() {
        var theme = new Theme();
        theme.id = this.guid();
        theme.achievement = this.state.achievementsName;
        theme.content = this.state.content;
        theme.name = this.state.name;
        theme.task = this.state.task;
        console.log(":: " + this.state.partNameTarget);
        
        var app = this;
        
        this.api.parts.getPartByName(function (res: any) {
            console.log(res)
            theme.partId = res._id;
            
            var part = new Part();
            part.id = res._id;
            part.achievement = res.Achievement;
            part.name = res.Name;
            part.themes = res.Themes;
            part.themes.push(theme);
            
            app.api.parts.update(function (res: any) {
                console.log("123")
                app.props.history.push("/");
            }, part);
        }, this.state.partNameTarget);
        
        console.log(theme);
    }
}
