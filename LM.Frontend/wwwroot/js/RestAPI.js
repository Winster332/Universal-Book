var CollectionType = {
    Books: "books",
    Parts: "parts",
    Themes: "themes",
    Pages: "Pages",
    Contents: "Contents"
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class Api {
    constructor() {
        this.host = "http://localhost:5050/api/";
    }

    getVersion(callback) {	this.get("base/version", function (json) { callback(JSON.parse(json)); });	}
    getDate(type, id, callback) { 
        if (id == null) {
            this.get(type, callback) 
        } else this.get(type + "/" + id, callback) 
    }
    updateDate(type, jsonDbObject, callback) {
        this.post(type + "/update", jsonDbObject, callback);
    }
    createDate(type, jsonDbObject, callback) {
        this.post(type + "/create", jsonDbObject, callback);
    }
    removeDate(type, id, func) {
        this.get(type + "/remove/" + id, func);
    }
    addPart(id, part, callback) {
        this.post(CollectionType.Books + "/" + id + "/addPart", part, callback);
    }
    parts(id, callback) {
        this.get(CollectionType.Books + "/" + id + "/parts", callback);
    }

    post(url, jsonObject, callback) {
        $.ajax({
            url: this.host + url,
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(jsonObject),
            dataType: "json",
            contentType: 'application/json',
            success: function (response) {
                callback(JSON.parse(response))
            },
            error: function (xhr, status) {
                // alert("error");
            }
        });
    }
    get(url, callback) {
        $.ajax({
            url: this.host + url,
            type: "GET",
            crossDomain: true,
            success: function (response) {
                callback(response)
            },
            error: function (xhr, status) {
                alert("error");
            }
        });
    }
}

var api = new Api();