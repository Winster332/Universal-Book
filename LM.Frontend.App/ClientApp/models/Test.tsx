import {DbObject, DbObjectType} from "./DbObject";

export class Test extends DbObject {
    public constructor() {
        super(DbObjectType.Test)
    }
}