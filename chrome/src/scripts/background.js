let db = null;

// Listener que verifica a aba a cada mudança ou atualização
/* chrome.tabs.onUpdated.addListener(function (tabid, change, tab) {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (typeof db != 'Object') {
		var DBOpenRequest = window.indexedDB.open("tourmaline", 1);

		DBOpenRequest.onsuccess = function (event) {
			db = DBOpenRequest.result;
			ativo(tabid, change, tab);
		};

		DBOpenRequest.onupgradeneeded = function (event) {
			db = event.target.result

			dbUpgrade(db);
		}
	} else {
		ativo(tabid, change, tab);
	}
}); */

function extractDomain(url) {
	var domain;
	//find & remove protocol (http, ftp, etc.) and get domain
	if (url.indexOf("://") > -1) {
		domain = url.split('/')[2];
	}
	else {
		domain = url.split('/')[0];
	}

	//find & remove port number
	domain = domain.split(':')[0];

	return domain;
}

function ativo(tabid, change, tab) {
	var link = document.createElement('a');
	link.setAttribute('href', tab.url);

	var transaction = db.transaction(['preferencia'], 'readonly');
	var objectStore = transaction.objectStore('preferencia');
	var request = objectStore.get(1);

	request.onsuccess = function (evt) {
		var value = request.result;
		var hoInicial = "1900-01-01T" + value.hoInicial + ":00.000Z";
		hoInicial = new Date(hoInicial).getTime();
		var hoFinal = "1900-01-01T" + value.hoFinal + ":00.000Z";
		hoFinal = new Date(hoFinal).getTime();
		var hoAtual = "1900-01-01T" + (new Date().toLocaleTimeString()) + ".000Z";
		hoAtual = new Date(hoAtual).getTime();

		if (value.ativo == true && link.protocol) {
			if (!(link.protocol == "chrome-extension:" || link.protocol == "chrome:")) {
				if (hoAtual >= hoInicial && hoAtual <= hoFinal) {
					if (getSite(extractDomain(tab.url), tabid) != true) {
						getPalavra(tabid, tab);
					}
				} else {
					chrome.tabs.update(tabid, { url: 'paginas/block.html' }, null);
				}
			}
		}
	}
}

function getSite(url, id) {
	console.log("getSite: " + url);

	var bloqueado = "false";

	var transaction = db.transaction(['site'], 'readonly');
	var objectStore = transaction.objectStore('site');
	var indice = objectStore.index('url');
	indice.get(url).onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			if (cursor.bloqueado == 'true') {
				bloqueado = "true";
				chrome.tabs.update(id, { url: 'paginas/block.html' }, null);
			}
		} else {
			console.log("Record retrieved.");
		}

		if (url.split(".").length > 1) {
			var now = new Date();
			now = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-" + now.getDate().toString() + "T00:00:00.000Z";

			var transaction = db.transaction(['acesso'], 'readwrite');
			var acessoStore = transaction.objectStore('acesso');
			acessoStore.add({ url: url, data: now, bloqueado: bloqueado.toString() });
		}
	};

	indice.onerror = function () {
		// If an error occurs with the request, log what it is
		console.log("There has been an error with retrieving your data: " + objectStoreTitleRequest.error);
	};
	return bloqueado = (bloqueado == "true");
}

function getPalavra(tabid, tab) {
	console.log("getPalavra: " + tab.url);

	var transaction = db.transaction(['palavra'], 'readonly');
	var objectStore = transaction.objectStore('palavra');
	var indice = objectStore.index('bloqueado');

	range = IDBKeyRange.only("true");

	indice.openCursor(range).onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			regExp = new RegExp(cursor.value.palavra, "i");
			if (tab.url.match(regExp) != null || tab.title.match(regExp) != null) {
				chrome.tabs.update(tabid, { url: 'paginas/block.html' }, null);
				var now = new Date();
				now = now.getFullYear().toString() + "-" + (now.getMonth() + 1).toString() + "-" + now.getDate().toString() + "T00:00:00.000Z";

				var acessoTransaction = db.transaction(['acesso'], 'readwrite');
				var acessoStore = acessoTransaction.objectStore('acesso');
				acessoStore.add({ url: tab.url, data: now, bloqueado: "true" });
			}
			cursor.continue();
		} else {
			console.log("Record retrieved.");
		}


	};

	indice.onerror = function () {
		// If an error occurs with the request, log what it is
		console.log("There has been an error with retrieving your data: " + objectStoreTitleRequest.error);
	};
}

