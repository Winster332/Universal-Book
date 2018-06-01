function deleteTest(btn) {
    var uiPanelTest = btn.parentElement.parentElement.parentElement; 
    var uiPanelTests = btn.parentElement.parentElement.parentElement.parentElement;
    uiPanelTests.removeChild(uiPanelTest);
}

function showResult(text, result) {
    'use strict';
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var handler = function(event) {
        alert("Ответ: " + result)
    };
        var data = {
            message: text,
            timeout: 2000,
            actionHandler: handler,
            actionText: 'Показать ответ'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

function testCalc(btn) {
    var uiPanelTest = btn.parentElement.parentElement;
    var result = uiPanelTest.childNodes[2].childNodes[0].nextSibling.id;
    var userResult = uiPanelTest.childNodes[2].childNodes[0].nextSibling.value;
    
    if (result === userResult) 
        showResult("Ответ верный", result);
    else showResult("Ответ не верный", result);
}

function saveTest(btn) {
    var descriptions = document.getElementById("sample5");
    var uiPanelTest = btn.parentElement.parentElement;
    var caption = uiPanelTest.childNodes[0].childNodes[0].childNodes[1].value;
    var quest = uiPanelTest.childNodes[1].childNodes[1].value;
    var result = uiPanelTest.childNodes[2].childNodes[1].value;

    var htmlTest =
        "<br>" +
        "<div class=\"demo-card-square mdl-card mdl-shadow--2dp\" style=\"margin-bottom: 5px\">" +
        "<div class=\"mdl-card__title mdl-card--expand\">" +
        "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">" +
        "    <h3>" + caption + "</h3>" +
        "</div>" +
        "</div>" +
        "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">" +
        "    <h4>" + quest + "</h4>" +
        "</div>" +
        "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">" +
        "    <input id=\"" + result + "\" class=\"mdl-textfield__input\" type=\"text\">" +
        "    <label class=\"mdl-textfield__label\" for=\"testResult\">Ответ...</label>" +
        "</div>" +
        "<div class=\"mdl-card__actions mdl-card--border\">" +
        "    <a id='result' onclick='testCalc(this)' class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">" +
        "        Ответить" +
        "    </a>" +
        "</div>" +
        "</div>";
    
    descriptions.value += htmlTest;
    
    deleteTest(btn);
}
function addNewTest() {
    console.log("423");

    var div = document.createElement("div");
    var htmlTest =
        "<div class=\"demo-card-square mdl-card mdl-shadow--2dp\" style=\"margin-bottom: 5px\">" +
        "<div class=\"mdl-card__title mdl-card--expand\">" +
        "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">" +
        "    <input class=\"mdl-textfield__input\" type=\"text\" id=\"testCaption\">" +
        "    <label class=\"mdl-textfield__label\" for=\"testCaption\">Заголовок...</label>" +
        "</div>" +
        "</div>" +
        "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">" +
        "    <input class=\"mdl-textfield__input\" type=\"text\" id=\"testQuest\">" +
        "    <label class=\"mdl-textfield__label\" for=\"testQuest\">Вопрос...</label>" +
        "</div>" +
        "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">" +
        "    <input class=\"mdl-textfield__input\" type=\"text\" id=\"testResult\">" +
        "    <label class=\"mdl-textfield__label\" for=\"testResult\">Ответ...</label>" +
        "</div>" +
        "<div class=\"mdl-card__actions mdl-card--border\">" +
        "    <a onclick='saveTest(this)' class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">" +
        "        Сохранить" +
        "    </a>" +
        "    <a onclick=\"deleteTest(this)\" class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">" +
        "        Удалить" +
        "    </a>" +
        "</div>" +
        "</div>";
    div.innerHTML = htmlTest;
    document.getElementById("tests").appendChild(div);
}
