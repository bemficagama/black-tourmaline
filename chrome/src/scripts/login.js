var db = {};

function disparaListeners() {
	var botaoLogin = document.getElementById("botaoLogin");
	
	botaoLogin.onclick = function (e) {
		e.preventDefault();
		login();
	}
}

function login() {
	var senha = document.getElementById('senha').value;
	
	var transaction = db.transaction(['user'], 'readonly');
	var objectStore = transaction.objectStore('user');
	var request = objectStore.get("admin");
	
	request.onsuccess = function(evt) {
		var value = request.result;
		
		if (value.senha == senha) {
			sessionStorage.adminMode = 1;
			window.frameElement.ownerDocument.location.href ="opcoes.html?op=1";
		} else {
			senha = "";
			alert("Senha Inválida!");
		}
		
	};
}

function imprimeMensagem(msg) {
	var mensagem = document.querySelector('#mensagem');
	mensagem.innerHTML = msg;
	sessionStorage.setItem("mensagem", msg);
	setTimeout(function() {
		$("#mensagem").html("");
		sessionStorage.setItem("mensagem", "");
	}, 4000);
}

window.onload = function() {
	
const request = window.indexedDB.open("tourmaline", 1);
	
	
	request.onsuccess = function(event) {
		db = request.result;
		disparaListeners();
	};
	
	request.onupgradeneeded = function(event) {
		db = event.target.result

		dbUpgrade(db);
	}
};

