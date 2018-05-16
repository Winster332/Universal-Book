
class UnitTests {
    constructor() {
        this.api = new Api();
    }
    CRUD() {
        var part = {
            Id: guid(),
            Name: "This part",
            ParentId: guid(),
            Themes: []
        };

        var partUpdated = {
            Id: part.Id,
            Name: "This",
            ParentId: guid(),
            Themes: []
        };

        console.log(part)

        this.api.createDate(CollectionType.Parts, part);
        this.api.updateDate(CollectionType.Parts, partUpdated, this.show);
        this.api.getDate(CollectionType.Parts, null, this.show);
        this.api.getVersion(this.show);
        this.api.getDate(CollectionType.Parts, part.Id, this.show);
        this.api.removeDate(CollectionType.Parts, part.Id)
    }
    books() {
        var part = {
            Id: guid(),
            Name: "new part",
            ParentId: guid(),
            Themes: []
        };
        
     //   this.api.addPart(guid(), part);
    }
    parts() {
        var book = {
            Id: guid(),
            Name: "new part",
            Parts: []
        };
        
        var part = {
            Id: guid(),
            Name: "41",
            ParentId: guid(),
            Themes: []
        };

        this.api.createDate(CollectionType.Books, book);
        
        this.api.addPart(book.Id, part, function () {});
        
        this.api.parts(book.Id, function (parts) {
            console.log("from book");
            console.log(parts)
        })
    }
    themes() {

    }
    contents() {

    }
    pages() {

    }
    run() {
        console.log("unit testing...");
        
        this.CRUD();
        
        this.books();
        this.parts();
        this.themes();
        this.contents();
        this.pages();
    }
    
    show(json) {
        console.log(json);
    }
}

function runTesting() {
    // var tests = new UnitTests();
    // tests.run();
}

//runTesting();
