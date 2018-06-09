function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export enum DbObjectType {
    User = 0, Part = 1, Theme = 2, Test = 3, Attainment = 4
}
export class DbObject {
    public id: string;
    public type: DbObjectType;
    
    public constructor(type: DbObjectType) {
        this.id = guid();
        this.type = type;
    }
}