import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {User} from "../models/User";
import {Api} from "../server/Api";

interface ProfileState {
    user: User;
    
    oldPassword: string;
    newPassword: string;
    newUsername: string;
    newDoublePassword: string;
}

export class Profile extends React.Component<RouteComponentProps<{}>, ProfileState> {
    api: Api;
    
    constructor() {
        super();
        
        this.api = new Api();
        
        this.state = {
            user: this.getUserFromCookie(),
            oldPassword: "",
            newDoublePassword: "",
            newPassword: "",
            newUsername: ""
        }
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
    
    public render() {
        return <div>
            <h1>Добро пожаловать</h1>
            <p>Имя: <a><b>{ this.state.user.name }</b></a></p>
            <p>Статус: <b>{ this.state.user.role == 0 ? <a>студаент</a> : <a>Администратор</a> }</b></p>
            <h4>Вам доступно:</h4>
                { this.state.user.role == 0 ? <ul>
                <li>Изучать темы и разделы</li>
                <li>Оставлять отзывы для каждой темы</li>
                <li>Читать и проходить тестовые задания</li>
                <li>Есть возможность воспользоваться валидатором ответов</li>
                <li>Использовать нейронную сеть для облегчения ввода математичиских уравнений</li>
            </ul>
                    : <ul>
                        <li>Изучать темы и разделы</li>
                        <li>Оставлять отзывы для каждой темы</li>
                        <li>Читать и проходить тестовые задания</li>
                        <li>Есть возможность воспользоваться валидатором ответов</li>
                        <li>Использовать нейронную сеть для облегчения ввода математичиских уравнений</li>
                        <li>Добавлять и удалять разделы и темы</li>
                        <li>Контролировать деятельность пользователей</li>
            </ul>
                }

            <div>
                <button onClick={() => this.showStatistic()} type="button" className="btn btn-primary">Показать мою статистику</button>
                <br/>
                <br/>
            </div>
                <div>
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
                        aria-expanded="false" aria-controls="collapseExample">
                    Хотите поменять пароль?
                </button>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <label htmlFor="exampleInputPassword1">Старый пароль</label>
                    <input onChange={e => this.handleOldPassword(e)}  type="password" className="form-control" id="password1" placeholder="Old password"></input>
                    <label htmlFor="exampleInputPassword1">Новый пароль</label>
                    <input onChange={e => this.handleNewPassword(e)}  type="password" className="form-control" id="password2" placeholder="New password"></input>
                    <label htmlFor="exampleInputPassword1">Повсторите новый пароль</label>
                    <input onChange={e => this.handleNewDoublePassword(e)} type="password" className="form-control" id="password3" placeholder="Double new password"></input>
                    <br/>
                    <button onClick={() => this.changePassword() } type="button" className="btn btn-primary">Изменить</button>
                    <br/>
                    <br/>
                </div>
            </div>
                </div>
            
            <div>
                <p>
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExampleUserName"
                            aria-expanded="false" aria-controls="collapseExample">
                        Хотите поменять логин?
                    </button>
                </p>
                <div className="collapse" id="collapseExampleUserName">
                    <div className="card card-body">
                        <label htmlFor="exampleInputPassword1">Новый логин</label>
                        <input onChange={e => this.handleNewUsername(e)} type="text" className="form-control" id="username1" placeholder="New username"></input>
                        <br/>
                        <button onClick={() => this.changeUserName() } type="button" className="btn btn-primary">Изменить</button>
                    </div>
                </div>
            </div>
            <h4>Удачи в познавании математики!</h4>
        </div>;
    }
    
    public handleOldPassword(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            oldPassword: event.currentTarget.value
        })
    }
    
    public handleNewPassword(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            newPassword: event.currentTarget.value
        })
    }
    
    public handleNewDoublePassword(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            newDoublePassword: event.currentTarget.value
        })
    }
    
    public handleNewUsername(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            newUsername: event.currentTarget.value
        })
    }
    
    public changePassword() {
        if (this.state.newPassword.length >= 4 && this.state.newPassword == this.state.newDoublePassword && 
            this.state.oldPassword == this.state.user.password) {
            
            var newUser = new User();
            newUser.password = this.state.newPassword;
            newUser.role = this.state.user.role;
            newUser.id = this.state.user.id;
            newUser.name = this.state.user.name;

            var app = this;

            this.api.users.update(function (res: any) {
                alert("Пароль успешно изменен");
                app.deleteCookie();

                document.cookie = "_user=" + JSON.stringify(newUser) + ";";

                app.setState({
                    user: newUser
                })
            }, newUser);
        } else alert("Проверьте правильность ввода пароля");
    }
    
    public changeUserName() {
        if (this.state.newUsername.length < 4) {
            alert("Новый логин слишком короткий")
        } else {
            var newUser = new User();
            newUser.password = this.state.user.password;
            newUser.role = this.state.user.role;
            newUser.id = this.state.user.id;
            newUser.name = this.state.newUsername;
            
            var app = this;
            
            this.api.users.update(function (res: any) {
                alert("Логин успешно изменен");
                app.deleteCookie();

                document.cookie = "_user=" + JSON.stringify(newUser) + ";";
                
                app.setState({
                    user: newUser
                })
            }, newUser);
        }
    }
    
    public showStatistic() {
        this.props.history.push("/statistic");
    }
    
    deleteCookie() {
        this.setCookie("_user", "", {
            expires: -1
        })
    }

    setCookie(name: string, value: string, options: any) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }
}