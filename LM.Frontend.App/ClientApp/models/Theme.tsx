import {DbObject, DbObjectType} from "./DbObject";

export class Theme extends DbObject {
    public constructor() {
        super(DbObjectType.Theme);
    }
}