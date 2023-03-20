function disparaListeners() {

}

window.onload = function () {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (typeof db != 'Object') {
		var DBOpenRequest = window.indexedDB.open("tourmaline", 1);

		DBOpenRequest.onsuccess = function (event) {
			db = DBOpenRequest.result;
			displayStatus()
		};

		DBOpenRequest.onupgradeneeded = function (event) {
			db = event.target.result

			dbUpgrade(db);
		}
	} else {
		displayStatus()
	}
	//disparaListeners();
};

function displayStatus() {
	var transaction = db.transaction(['preferencia'], 'readonly');
	var objectStore = transaction.objectStore('preferencia');
	var request = objectStore.get(1);

	var upData = document.getElementById('upData');

	request.onsuccess = function (evt) {
		var value = request.result;

		upData.innerHTML = value.upData;
		getTotalCategoria();
		getTotalSite();
		getTotalPalavra();
	};
}

function getTotalCategoria() {
	var upCategoria = document.getElementById('upCategoria');
	var transaction = db.transaction(['categoria'], 'readonly');
	var objectStore = transaction.objectStore('categoria');

	//var indice = objectStore.index('id'); 
	var countRequest = objectStore.count();
	countRequest.onsuccess = function () {
		upCategoria.innerHTML = countRequest.result;
	}
}

function getTotalSite() {
	var upSite = document.getElementById('upSite');
	var transaction = db.transaction(['site'], 'readonly');
	var objectStore = transaction.objectStore('site');

	//var indice = objectStore.index('id'); 
	var countRequest = objectStore.count();
	countRequest.onsuccess = function () {
		upSite.innerHTML = countRequest.result;
	}
}

function getTotalPalavra() {
	var upPalavra = document.getElementById('upPalavra');
	var transaction = db.transaction(['palavra'], 'readonly');
	var objectStore = transaction.objectStore('palavra');

	var countRequest = objectStore.count();
	countRequest.onsuccess = function () {
		upPalavra.innerHTML = countRequest.result;
	}
}