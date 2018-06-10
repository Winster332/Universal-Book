import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {User} from "../models/User";
import {Part} from "../models/Part";
import {Api} from "../server/Api";

interface BookState {
    user: User;
    parts: Array<any>;
}

export class Home extends React.Component<RouteComponentProps<{}>, BookState> {
    api: Api;
    
    constructor() {
        super();
        
        this.api = new Api();
        
        this.state = {
            user: this.getUserFromCookie(),
            parts: []
        };
        
        var app = this;
        
        this.api.parts.get(function (res: any) {
            var parts = res.data;
            app.setState({
                parts: parts
            })
            console.log(parts)
        });
    }
    
    public render() {
        return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Математика</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Параграфы</li>
                </ol>
            </nav>
            <h1>Математика</h1>
            <p>Выберите нужный для вас раздерл и тему</p>

            {
                this.state.user.role == 1 ? 
                    <div>
                        <hr/>
                        <p>Вы являетесь администратором и можете вносить изменения в структуру книги</p>

                        <p>
                            <a onClick={() => this.addPart() } className="btn btn-primary" role="button">
                                Добавить параграф
                            </a>
                        </p>
                    </div>
                    : ""
            }

            <div className="accordion" id="accordionExample">
                {
                    this.state.parts.map(part =>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target={"#" + part.Name} aria-expanded="false" aria-controls={part.Name}>
                                    {part.Name}
                                </button>
                                {
                                    this.state.user.role == 1 ? 
                                    <b>|</b>
                                    :""
                                }
                                {
                                    this.state.user.role == 1 ? 
                                    <button onClick={() => this.addTheme()} className="btn btn-link collapsed"
                                            type="button">
                                        Добавить тему
                                    </button>
                                        : ""
                                }
                                {
                                    this.state.user.role == 1 ? 
                                    <button onClick={() => this.deletePart(part)} className="btn btn-link collapsed"
                                            type="button">
                                        Удалить
                                    </button>
                                        : ""
                                }
                            </h5>
                        </div>
                        <div id={part.Name} className="collapse" aria-labelledby="headingThree"
                             data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="list-group">
                                    {
                                        part.Themes == undefined ? "" :
                                            part.Themes.map((theme: any) => 
                                            <button onClick={() => this.selectTheme(theme)} type="button" className="list-group-item list-group-item-action">
                                                {theme.Name}
                                            </button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
            </div>
        </div>;
    }
    
    deleteCookie() {
        this.setCookie("_currentThemeId", "", {
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
    
    public selectTheme(theme: any) {
        this.deleteCookie();
        document.cookie = "_currentThemeId=" + JSON.stringify({ id: theme._id} ) + ";";
        this.props.history.push("/page")
    }
    
    public addPart() {
        this.props.history.push("/newpart")
    }
    
    public addTheme() {
        this.props.history.push("/newtheme")
    }
    
    public deletePart(part: any) {
        var app = this;
        
        this.api.parts.remove(function (r: any) {
            app.api.parts.get(function (res: any) {
                var parts = res.data;
                app.setState({
                    parts: parts
                })
            });
        }, part._id)
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
}
