import {DbObject, DbObjectType} from "./DbObject";

export class Part extends DbObject {
    public constructor() {
        super(DbObjectType.Part);
    }
}