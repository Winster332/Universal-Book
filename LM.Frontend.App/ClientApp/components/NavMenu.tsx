import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Item {
    name: string;
    isShow: boolean;
    toAction: string;
    
    constructor(name: string, isShow: boolean, toAction: string) {
        this.name = name;
        this.isShow = isShow;
        this.toAction = toAction;
    }
}

interface NavMenuState {
    items: Array<Item>;
}

var ItemComponent = React.createClass({
    render: function () {
        const item = this.props.item;
        return <li>
            <NavLink to={item.toAction} activeClassName='active'>
                <span className='glyphicon glyphicon-home'></span>{item.name}
            </NavLink>
        </li>
    }
});

export class NavMenu extends React.Component<{}, NavMenuState> {
    constructor() {
        super();

        function getCookie(name: any) : any {
                var matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
            if (matches != null) {
                return matches ? decodeURIComponent(matches[1]) : "";
            } else return null;
        }

        var user = JSON.parse(getCookie("_user"));
        console.log(user)

        if (user == null) {
            this.state = {
                items: [
                    new Item(" Авторизация / Регистрация", true, "/auth"),
                    new Item(" О приложении", true, "/about")
                ]
            };
        } else {
            this.state = {
                items: [
                    new Item(" Профиль", true, "/profile"),
                    new Item(" Книги", true, "/"),
                    new Item(" Статистика", true, "/statistic"),
                    new Item(" О приложении", true, "/about"),
                    new Item(" Выход", true, "/exit"),
                ]
            };
        }
    }
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>LM.Frontend.App</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        { this.state.items.map(item => 
                        item.isShow ? <li>
                            <NavLink to={ item.toAction } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> {item.name}
                            </NavLink>
                        </li> : ""
                        )}
                    </ul>
                </div>
            </div>
        </div>;
    }
}
