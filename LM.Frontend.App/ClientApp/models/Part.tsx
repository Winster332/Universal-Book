import {DbObject} from "./DbObject";

export class Part extends DbObject {
    public Name: string;
    public Themes: Array<string>;
    public Achievement: string;

    public constructor() {
        super();
    }
}