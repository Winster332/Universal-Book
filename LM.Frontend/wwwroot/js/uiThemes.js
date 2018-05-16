function enableMenu() {
    $("#theme-content").hide();
    $("#menu").show();
}

function editTheme(buttonForId) {
    var themeId = buttonForId.id;
    var btnSave = document.getElementById("btnSaveTheme");
    btnSave.onclick = function() {
        api.removeDate(CollectionType.Themes, themeId)

        setTimeout(
            function()
            {
        
        var title = document.getElementById("sample3").value;
        var description = document.getElementById("sample5").value;
        var select = document.getElementById("selectParts").childNodes[0];
        var theme = select[select.selectedIndex].innerHTML;

        console.log(title);
        console.log(description);
        console.log(theme);

//        api.getDate(CollectionType.Parts, null, );
        var parts = document.getElementById("parts").childNodes;

        var themeId = null;
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];

            if (theme == part.text)
                themeId = part.theme;

        }

        var theme = {
            Id: guid(),
            Name: title,
            Description: description,
            ParentId: themeId
        }

        api.createDate(CollectionType.Themes, theme, function() {
            console.log(321);
        });

        $("#myModal").hide();

        setTimeout(
            function()
            {
                refreshThemes();
            }, 1000);
        enableMenu();
            }, 1000);
    };

    api.getDate(CollectionType.Themes, themeId, function (themes) {
        var theme = themes[0];
        
        document.getElementById("sample3").value = theme.Name;
        document.getElementById("sample5").value = theme.Description;
        
        $("#myModal").show();
    })
    
    
};

function deleteTheme(btn) {
    var themeId = btn.id;
    
    enableMenu();
    
   api.removeDate(CollectionType.Themes, themeId);

    setTimeout(
        function()
        {
            $("#themes").empty();
        }, 1000);
}

