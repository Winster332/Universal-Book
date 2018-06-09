import {DbObject, DbObjectType} from "./DbObject";

export class User extends DbObject {
    public name: string;
    public password: string;
    
    public constructor() {
        super(DbObjectType.User);
    }
}