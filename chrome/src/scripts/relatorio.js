var db = {};

window.onload = function () {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	
	var DBOpenRequest = window.indexedDB.open("tourmaline", 1);

	DBOpenRequest.onsuccess = function(event) {
		db = DBOpenRequest.result;
		disparaListeners();
	}
	
	DBOpenRequest.onupgradeneeded = function(event) {
		db = event.target.result

    	dbUpgrade(db);
	}
};

function disparaListeners() {
	var botaoPesquisar = document.getElementById("botaoPesquisar");

	botaoPesquisar.onclick = function () {
	    console.log("Pesquisar ...");
	    displayResultados();
	}
}

/**
 * @param {IDBObjectStore=} store
 */
function displayResultados() {
	var resultadoList = document.getElementById('resultadoList');
	var dataInicial = document.getElementById("edDataInicial").value;
	var dataFinal = document.getElementById("edDataFinal").value;
	
	while(resultadoList.tBodies[0].hasChildNodes()){                
		resultadoList.tBodies[0].removeChild(resultadoList.tBodies[0].firstChild);
	}
	console.log("display resultadoList");

	var transaction = db.transaction(['acesso'], 'readonly');
	var objectStore = transaction.objectStore('acesso');
	var indice = objectStore.index('data');
	
	dataInicial = new Date(dataInicial);
	dataFinal = new Date(dataFinal);
	
	range = IDBKeyRange.bound(dataInicial.toJSON(), dataFinal.toJSON());
 
	indice.openCursor(range).onsuccess = function(evt) {
		var cursor = evt.target.result;
		// If the cursor is pointing at something, ask for the data
		if (cursor) {
			var value = cursor.value;
			
			var linha = resultadoList.tBodies[0].insertRow(-1);
			var celula1 = linha.insertCell(-1);
			var celula2 = linha.insertCell(-1);
			var celula3 = linha.insertCell(-1);
			celula1.innerHTML = new Date(value.data).toLocaleDateString();
			celula2.innerHTML = value.url;
			celula3.innerHTML = (value.bloqueado == "true" ? "Bloqueado" : "");
			celula1.style.width = "70px";
			celula2.style.width = "300px";
		
			// Move on to the next object in store
			cursor.continue();
		
		// This counter serves only to create distinct ids
		} else {
			console.log("No more entries: Acesso");
		}
	};
}