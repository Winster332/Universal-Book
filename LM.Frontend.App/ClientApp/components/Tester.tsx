import {RouteComponentProps} from "react-router";
import * as React from "react";

export class Tester extends React.Component<RouteComponentProps<{}>, {}> {

    constructor() {
        super();
    }

    public render() {
        return <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Математика</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Тренажер</li>
                </ol>
            </nav>
            <h1>Тренажер</h1>
            <iframe src="https://chisloboi.ru/" width="868" height="800">
                Ваш браузер не поддерживает плавающие фреймы!
            </iframe>
        </div>;
    }
}
