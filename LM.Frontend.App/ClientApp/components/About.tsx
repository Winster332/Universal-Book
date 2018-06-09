import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {Api} from "../server/Api";
import {hasSufficientPermissions} from "aspnet-webpack/WebpackTestPermissions";

interface AboutState {
    name: string;
    version: string;
    author: string;
    contacts: Array<string>;
}

export class About extends React.Component<RouteComponentProps<{}>, AboutState> {
    private api: Api;
    
    constructor() {
        super();

        this.state = {
            name: "none",
            version: "none.none.none",
            author: "none none none",
            contacts: []
        };
        this.api = new Api();
        
        this.loadContent();
    }
    
    public loadContent() {
        this.api.app.getVersion(function (result: any, instance: About) {
            instance.setState({version: result.version.toString()})
        }, this);

        this.api.app.getName(function (result: any, instance: About) {
            instance.setState({name: result.name.toString()})
        }, this);
        
        this.api.app.getAuthor(function (result: any, instance: About) {
            instance.setState({author: result.author.toString()})
        }, this);
        
        this.api.app.getContacts(function (result: any, instance: About) {
            instance.setState({contacts: result.contacts.toString()})
        }, this);
    }
    
    public render() {
        return <div>
            <h1>Информация о приложении</h1>
            
            <h3>О сервере</h3>
            <p>Данное приложение предназначено для улучшения знаний в области математики</p>
            <p>Имя: <a>{this.state.name}</a></p>
            <p>Версия: <a>{this.state.version}</a></p>
            <p>Автор: <a>{this.state.author}</a></p>
            <p>Контакты: <a>{this.state.contacts}</a></p>
            
            <h3>Стек</h3>
            <div className="list-group">
                <a className="list-group-item list-group-item-action active">
                    Inside Engine
                </a>
                <a href="https://reactjs.org/" className="list-group-item list-group-item-action">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" height="30"/>
                    <a> React — это библиотека JavaScript, которая используется для создания пользовательского интерфейса. React был создан компанией Facebook, а первый релиз библиотеки увидел свет в марте 2013 года. Текущей версий на данный момент (октябрь 2017 года) является версия React v16.0.</a>
                </a>
                <a href="https://www.mongodb.com/" className="list-group-item list-group-item-action">
                    <img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB-Logo-5c3a7405a85675366beb3a5ec4c032348c390b3f142f5e6dddf1d78e2df5cb5c.png" alt="" height="30"/>
                    <a> MongoDB — документоориентированная система управления базами данных (СУБД) с открытым исходным кодом, не требующая описания схемы таблиц. Классифицирована как NoSQL, использует JSON-подобные документы и схему базы данных. Написана на языке C++.</a>
                </a>
                <a href="https://docs.microsoft.com/ru-ru/aspnet/core/?view=aspnetcore-2.1" className="list-group-item list-group-item-action">
                    <img src="data:image/png;base64,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" alt="" height="30"/>
                    <a> ASP.NET Core является кроссплатформенной, высокопроизводительной средой с открытым исходным кодом для создания современных облачных приложений, подключенных к Интернету. ASP.NET Core</a>
                </a>
                <a href="https://getbootstrap.com/" className="list-group-item list-group-item-action">
                    <img src="http://bootstrap-4.ru/docs/4.1/assets/img/bootstrap-stack.png" alt="" height="30"/>
                    <a> Bootstrap — свободный набор инструментов для создания сайтов и веб-приложений. Включает в себя HTML- и CSS-шаблоны оформления для типографики, веб-форм, кнопок, меток, блоков навигации и прочих компонентов веб-интерфейса, включая JavaScript-расширения.</a>
                </a>
                <a href="https://en.wikipedia.org/wiki/Artificial_neural_network" className="list-group-item list-group-item-action">
                    <img src="https://paulvanderlaken.files.wordpress.com/2017/10/1-0flvittznpkh8qkj7upleq.png?w=700" alt="" height="30"/>
                    <a> Искусственная нейронная сеть (ИНС) — математическая модель, а также её программное или аппаратное воплощение, построенная по принципу организации и функционирования биологических нейронных сетей — сетей нервных клеток живого организма.</a>
                </a>
                <a href="https://www.typescriptlang.org/" className="list-group-item list-group-item-action">
                    <img src="https://cdn-images-1.medium.com/max/1024/0*dr-Nr-6WsphJPBFb.png" alt="" height="30"/>
                    <a> TypeScript — язык программирования, представленный Microsoft в 2012 году и позиционируемый как средство разработки веб-приложений, расширяющее возможности JavaScript.</a>
                </a>
                <a href="https://docs.microsoft.com/ru-ru/dotnet/csharp/" className="list-group-item list-group-item-action">
                    <img src="data:image/png;base64,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" alt="" height="30"/>
                    <a> C# — объектно-ориентированный язык программирования. Разработан в 1998—2001 годах группой инженеров компании Microsoft под руководством Андерса Хейлсберга и Скотта Вильтаумота как язык разработки приложений для платформы Microsoft .NET Framework.</a>
                </a>
                <a href="https://docs.microsoft.com/ru-ru/dotnet/csharp/" className="list-group-item list-group-item-action">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" alt="" height="30"/>
                    <a> JavaScript — мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией языка ECMAScript (стандарт ECMA-262).</a>
                </a>
            </div>
        </div>;
    }
}
