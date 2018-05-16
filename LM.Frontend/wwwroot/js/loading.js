
function run() {
	api.getVersion(function (json) {
		console.log(json)
	});
	
	api.getParts(function (json) {
		
		for (var i = 0; i < json.length; i++) {
			var element = document.createElement("a");
			element.className = "mdl-navigation__link";
			element.innerHTML = json[i].Name;
			element.theme = json[i]._id;

			element.onclick = function (x) {
				var themeId = x.path[0].theme;
				
				apiGet("http://localhost:5050/api/themes", function (response) {
					console.log(response)
				})
			};

			var parts = document.getElementById("parts");
			parts.appendChild(element);
		}
	});
	
	document.getElementById("addPartBtn").onclick = function () {
		var name = prompt('Название параграфа', 'Дайте название');
		
		if (name != null) {
			var json = {
				Name: name
			};
			
			apiPost("http://localhost:5050/api/books/AddPart/", json, function (response) {
				console.log(response);
			})
		}
	}
}

function apiPost(url, jsonObject, callback) {
	$.ajax({
		url: url,
		type: "POST",
		crossDomain: true,
		data: JSON.stringify(jsonObject),
		dataType: "json",
		success: callback,
		error: function (xhr, status) {
			alert("error");
		}
	});
}

function apiGet(url, callback) {
	$.ajax({
		url: url,
		type: "GET",
		crossDomain: true,
		// data: JSON.stringify(somejson),
		// dataType: "json",
		success: callback,
		error: function (xhr, status) {
			alert("error");
		}
	});
}

run();

