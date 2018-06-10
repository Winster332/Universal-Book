import {DbObject} from "./DbObject";
import {Theme} from "./Theme";

export class Part extends DbObject {
    public name: string;
    public themes: Array<Theme>;
    public achievement: string;

    public constructor() {
        super();
    }
}