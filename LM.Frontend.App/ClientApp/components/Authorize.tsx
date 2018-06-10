import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {Role, User} from "../models/User";
import {Api} from "../server/Api";

interface UserState {
    name: string,
    password: string,
    
    isShowRegistratin: boolean;
    activeAuth: string;
    activeReg: string;
}

var AuthorizePanel = React.createClass({
    render: function () {
        return <div>Для авторищации введите логин и пароль</div>
    }
});

var RegistrationPanel = React.createClass({
    render: function () {
        return <div>Для регистрации придумайте логин и пароль<p>Логин и пароль должен быть больше 5-ти символов</p></div>;
    }
});

export class Authorize extends React.Component<RouteComponentProps<{}>, UserState> {
    private api: Api;
    
    constructor() {
        super();
        
        this.api = new Api();

        this.state = {
            name: "",
            password: "",
            isShowRegistratin: false,
            activeAuth: "btn btn-secondary active",
            activeReg: "btn btn-secondary"
        };
    }
    
    public render() {
        return <div>
            <h1>Добро пожаловать в математический тренажер</h1>
            <p>Данный сервис поможет тебе улучшить твои знания в облати математики</p>
            <ul>
                <li>Для начала тебе нужно <button onClick={() => this.activeRegistration()} type="button" className="btn btn-primary">зарагестрироваться</button> или <button onClick={() => this.activeAuthrization()} type="button" className="btn btn-primary">войти</button></li>
                <li>После чего ты сможешь выбрать нужный тебе раздел и начать изучать темы</li>
                <li>Ты всегда можешь протестировать свои знания после изучения каждой темы</li>
                <li>За изучение каждого раздела и успешное прохождения теста, тебе начисляется вознагрождение</li>
            </ul>
            <p>Для администратора доступны следующие возможности:</p>
            <ul>
                <li>Создание собственных разделов</li>
                <li>Добавление тем</li>
                <li>Упаревление пользовтелями</li>
            </ul>
            <h4>Авторизация и регистрация</h4>
            <p>Если вы уже зарегестрированы, то просто введите свои данные. Если вам необходимо зарегестрироваться, выберите пункт <b>Регистрация</b></p>
            <div className="btn-group btn-group-toggle">
                <label id="auth-panel" onClick={() => this.activeAuthrization()} className={this.state.activeAuth}>
                    <p>Авторизация</p>
                </label>
                <label id="reg-panel" onClick={() => this.activeRegistration()} className={this.state.activeReg}>
                    <p>Регистрация</p>
                </label>
            </div>
            { this.state.isShowRegistratin != true ? <AuthorizePanel/> : <RegistrationPanel/> }
            <div id="panel-authorization">
                <label htmlFor="exampleInputPassword1">Логин</label>
                <input onChange={e => this.inputChangeNameHandle(e)} className="form-control" type="text" id="username" placeholder="User name"></input>
                <label htmlFor="exampleInputPassword1">Пароль</label>
                <input onChange={e => this.inputChangePasswordHandle(e)} type="password" className="form-control" id="password" placeholder="Password"></input>
                <br/>
                <button onClick={ () => this.userAuthorize() } type="button" className="btn btn-primary">Войти</button>
            </div>
        </div>;
    }
    
    activeRegistration() {
        this.setState({
            isShowRegistratin: true,
            activeReg: "btn btn-secondary active",
            activeAuth: "btn btn-secondary"
        })
    }
    
    activeAuthrization() {
        this.setState({
            isShowRegistratin: false,
            activeReg: "btn btn-secondary",
            activeAuth: "btn btn-secondary active"
        })
    }
    
    inputChangeNameHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            name: event.currentTarget.value
        })
    }
    
    inputChangePasswordHandle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            password: event.currentTarget.value
        })
    }
    
    public userAuthorize() {
        var user = new User();
        user.name = this.state.name;
        user.password = this.state.password;
        user.role = Role.Student;
        
        if (user.name.length < 5 || user.password.length < 5) {
            alert("Имя или пароль содержит меньше 5-ти знаков")
            return;
        }
        var app = this;
        
        if (this.state.isShowRegistratin) {
            console.log("registration");
            this.api.users.create(function (r: any) {
                console.log("created user: ");
                console.log(user);
            }, user);
        } else {
            console.log("authorize");
            this.api.users.login(function (r: any) {
                var currentUserId = r.data.id;
                
                if (r.statusText == "No Content") {
                    alert("Не удалось авторизоваться, проверьте пароль или логин")
                } else {
                    app.api.users.get(function (res: any) {
                        res.data.forEach((item: any) => {
                            console.log(item._id + " == " + currentUserId)
                            if (item._id.toString() == currentUserId.toString()) {
                                console.log("item: ")
                                console.log(item)
                                user = new User();
                                user.role = item.Role;
                                user.id = item._id;
                                user.name = item.Name;
                                user.password = item.Password;
                                
                                document.cookie = "_user=" + JSON.stringify(user) + ";";
                                app.props.history.push("/");

                                location.reload();
                            }
                        })
                    });
                }
            }, user);
        }
        
    }
}
