import {DbObject} from "./DbObject";

export class Theme extends DbObject {
    public name: string;
    public content: string;
    public partId: string;
    public achievement: string;
    public task: string;

    public constructor() {
        super();
    }
}