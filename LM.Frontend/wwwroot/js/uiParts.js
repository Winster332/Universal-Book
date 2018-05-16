function refreshParts() {
    api.getDate(CollectionType.Parts, null, function (json) {
        $("#parts").empty();
        $("#selectParts").empty();

        var select = document.createElement("select");
        for (var i = 0; i < json.length; i++) {
            var element = document.createElement("a");
            element.className = "mdl-navigation__link";
            element.innerHTML = json[i].Name;
            element.theme = json[i]._id;
            element.themeParentId = json[i].ParentId;

            var option = document.createElement("option");
            option.innerHTML = json[i].Name;

            element.onclick = function (x) {
                var themeId = x.path[0].theme;

                api.getDate(CollectionType.Themes, null, function (themes) {
                    $("#themes").empty();
                    api.getDate(CollectionType.Parts, null, function (parts) {
                        for (var j = 0; j < themes.length; j++) {
                            var currentTheme = themes[j];

                            console.log(currentTheme.ParentId + " | " + themeId)
                                
                                if (currentTheme.ParentId == themeId) {
                                    var tr = document.createElement("tr");
                                    var element = document.createElement("td");
                                    element.className = "mdl-data-table__cell--non-numeric";
                                    element.innerHTML = currentTheme.Name;
                                    element.theme = currentTheme._id;

                                    element.onclick = function (x) {
                                        var themeId = x.path[0].theme;

                                        $("#menu").hide();
                                        api.getDate(CollectionType.Themes, themeId, function (actualListTheme) {
                                            var actualTheme = actualListTheme[0];

                                            document.getElementById("theme-content").innerHTML =
                                                "<button onclick='enableMenu()' class=\"mdl-button mdl-js-button mdl-button--primary\">\n" +
                                                "НАЗАД" +
                                                "</button>" +
                                                "<button id='" + actualTheme._id + "' onclick='deleteTheme(this)' class=\"mdl-button mdl-js-button mdl-button--primary\">\n" +
                                                "УДАЛИТЬ" +
                                                "</button>" +
                                                "<button id='" + actualTheme._id + "' onclick='editTheme(this)' class=\"mdl-button mdl-js-button mdl-button--primary\">\n" +
                                                "РЕДАКТИРОВАТЬ" +
                                                "</button>" +
                                                "<h1 id='theme-content-title'>" + actualTheme.Name + "</h1>" +
                                                "<h5>" + actualTheme.Description + "</h5>";
                                            $("#theme-content").show();
                                        });
                                    };

                                    var parts = document.getElementById("themes");
                                    tr.appendChild(element);
                                    parts.appendChild(tr);
                                }
                        }
                    });
                });
            };

            select.appendChild(option);

            var parts = document.getElementById("parts");
            parts.appendChild(element);
        }
        var parts = document.getElementById("selectParts");
        parts.appendChild(select);
    });
}

function run() {

    $("#myModal").hide();

    document.getElementById("addPartBtn").onclick = function () {
        var name = prompt('Название параграфа', 'Дайте название');

        if (name != null) {
            var part = {
                Id: guid(),
                Name: name,
                ParentId: guid(),
                Themes: []
            };

            api.createDate(CollectionType.Parts, part, function (response) {
                console.log(response);
            });
            setTimeout(
                function()
                {
                    refreshParts();
                }, 1000);
        }
    };

    refreshParts();
}

run();
