import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {User} from "../models/User";

interface BookState {
    user: User;
}

export class Home extends React.Component<RouteComponentProps<{}>, BookState> {
    constructor() {
        super();
        
        this.state = {
            user: this.getUserFromCookie()
        }
    }
    
    public render() {
        return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Математика</a></li>
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
                            <a className="btn btn-primary" role="button">
                                Добавить параграф
                            </a>
                        </p>
                    </div>
                    : ""
            }

            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                    data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Введение
                            </button>
                            |
                            <button className="btn btn-link collapsed" type="button">
                                Добавить тему
                            </button>
                            <button className="btn btn-link collapsed" type="button">
                                Удалить
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            <div className="list-group">
                                <button type="button" className="list-group-item list-group-item-action">
                                    Что такое математика
                                </button>
                                <button type="button" className="list-group-item list-group-item-action">
                                    Целые числа
                                </button>
                                <button type="button" className="list-group-item list-group-item-action">
                                    Простые числа
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                    data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Логарифмы
                            </button>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                            squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa
                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                            single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                            beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
                            lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you
                            probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>;
    }
    
    public addPart() {
        
    }
    
    public addTheme() {

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
