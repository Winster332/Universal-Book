import {DbObject, DbObjectType} from "./DbObject";

export class Attainment extends DbObject {
    public constructor() {
        super(DbObjectType.Attainment);
    }
}