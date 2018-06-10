import {DbObject} from "./DbObject";

export enum Role { Student = 0, Admin = 1 }

export class User extends DbObject {
    public name: string;
    public password: string;
    public role: Role;
    
    public constructor() {
        super();
    }
}