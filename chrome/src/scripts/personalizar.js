var db = {};

window.onload = function (event) {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	
	var DBOpenRequest = window.indexedDB.open("tourmaline", 1);
	
	
	DBOpenRequest.onsuccess = function(event) {
		db = DBOpenRequest.result;
		disparaListeners();
		displaySiteList();
		displayPalavraList();
	};
	
	DBOpenRequest.onupgradeneeded = function(event) {
		db = event.target.result

    	dbUpgrade(db);
	}
};

function disparaListeners() {
	var botaoAddSite = document.getElementById("botaoAddSite");
	var botaoAddPalavra = document.getElementById("botaoAddPalavra");

	botaoVoltar.onclick = function () {
		console.log("Cancela Personalização ...");
		window.frameElement.ownerDocument.location.href ="opcoes.html?op=2";
	};
	
	botaoAddSite.onclick = function () {
	    console.log("Adicionando Site ...");
	    addSite();
	};
	  
	botaoAddPalavra.onclick = function () {
	    console.log("Adicionando Palavra ...");
	    addPalavra();
	};
}

/**
 * @param {IDBObjectStore=} store
 */
function displaySiteList() {
	var site_list = document.getElementById('siteItems');
	while(site_list.tBodies[0].hasChildNodes()){                
		site_list.tBodies[0].removeChild(site_list.tBodies[0].firstChild);
	}
	console.log("displaySiteList");

	var transaction = db.transaction(['site'], 'readonly');
	var objectStore = transaction.objectStore('site');
	var indice = objectStore.index('categoria');
 
	var keyRangeValue = IDBKeyRange.only(["Personalizada"]);
	indice.openCursor(keyRangeValue).onsuccess = function(evt) {
		var cursor = evt.target.result;
		// If the cursor is pointing at something, ask for the data
		if (cursor) {
			console.log("displaySiteList cursor:", cursor);
			var value = cursor.value;
			
			var linha = site_list.tBodies[0].insertRow(-1);
			var celula1 = linha.insertCell(-1);
			var celula2 = linha.insertCell(-1);
			var lbSite = document.createElement ("label");
			lbSite.value = value.url;
			lbSite.innerHTML = value.url;
			celula1.appendChild(lbSite);
			var deleteButton = document.createElement('button');
			celula2.appendChild(deleteButton);
			deleteButton.innerHTML = 'X';
			// here we are setting a data attribute on our delete button to say what task we want deleted if it is clicked! 
			deleteButton.setAttribute('data-id', value.id);
			deleteButton.onclick = function(event) {
			    delSite(event);
			}
		
			// Move on to the next object in store
			cursor.continue();
		
		// This counter serves only to create distinct ids
		} else {
			console.log("No more entries: Site");
		}
	};
}

/**
 * @param {IDBObjectStore=} store
 */
function displayPalavraList() {
	var palavra_list = document.getElementById('palavraItems');
	while(palavra_list.tBodies[0].hasChildNodes()){                
		palavra_list.tBodies[0].removeChild(palavra_list.tBodies[0].firstChild);
	}
	console.log("displayPalavraList");
	
	var transaction = db.transaction(['palavra'], 'readonly');
	var objectStore = transaction.objectStore('palavra');
	var indice = objectStore.index('categoria');
  
	var keyRangeValue = IDBKeyRange.only(["Personalizada"]);
	indice.openCursor(keyRangeValue).onsuccess = function(evt) {
	    var cursor = evt.target.result;
	    if (cursor) {
			console.log("displayPalavraList cursor:", cursor);
			var value = cursor.value;

			var linha = palavra_list.tBodies[0].insertRow(-1);
			var celula1 = linha.insertCell(-1);
			var celula2 = linha.insertCell(-1);
			var lbPalavra = document.createElement ("label");
			lbPalavra.value = value.palavra;
			lbPalavra.innerHTML = value.palavra;
			celula1.appendChild(lbPalavra);
			var deleteButton = document.createElement('button');
			celula2.appendChild(deleteButton);
			deleteButton.innerHTML = 'X';
			// here we are setting a data attribute on our delete button to say what task we want deleted if it is clicked! 
			deleteButton.setAttribute('data-id', value.id);
			deleteButton.onclick = function(event) {
				delPalavra(event);
			}

			  // Move on to the next object in store
			  cursor.continue();
		} else {
		  console.log("No more entries: Palavra");
		}
  };
}

/**
 * @param {string} biblioid
 * @param {string} title
 * @param {number} year
 * @param {Blob=} blob
 */
function addSite() {
	console.log("addSite", arguments);
	  
	var url = document.getElementById("edSite").value;
	var obj = { url: url, categoria: ["Personalizada"], bloqueado: "true" };
	  
	var transaction = db.transaction(["site"], "readwrite");
	var objectStore = transaction.objectStore("site");
	var objectStoreRequest = objectStore.add(obj);
	
	objectStoreRequest.onsuccess = function (evt) {
	    console.log("Insertion in DB successful");
	    displaySiteList();
	};
	objectStoreRequest.onerror = function() {
	    console.error("addSite error", this.error);
	};
}

function addPalavra() {
	console.log("addPalavra", arguments);
	  
	var palavra = document.getElementById("edPalavra").value;
	var obj = { palavra: palavra, categoria: ["Personalizada"], bloqueado: "true"};
  
	var transaction = db.transaction(["palavra"], "readwrite");
	var objectStore = transaction.objectStore("palavra");
	var objectStoreRequest = objectStore.add(obj);

	objectStoreRequest.onsuccess = function (evt) {
		console.log("Insertion in DB successful");
		displayPalavraList();
	}
	
	objectStoreRequest.onerror = function() {
		console.error("addPalavra error", this.error);
	}
}

function delSite(event) {
    // retrieve the name of the task we want to delete 
    var dataId = parseInt(event.target.getAttribute('data-id'));

    // open a database transaction and delete the task, finding it by the name we retrieved above
    var transaction = db.transaction(["site"], "readwrite");
    var objectStore = transaction.objectStore("site");
    var objectStoreRequest = objectStore.delete(dataId);

    // report that the data item has been deleted
    objectStoreRequest.onsuccess = function(event) {
	    // delete the parent of the button, which is the list item, so it no longer is displayed
    	displaySiteList();
	    console.log('Site \"' + dataId + '\" deleted.');
    }
    
    transaction.onerror = function() {
        console.error("delSite error", this.error);
        //displayActionFailure(this.error);
    }
      
    transaction.onabort = function() {
		console.error("delSite error", this.error);
		//displayActionFailure(this.error);
    }
        
    objectStoreRequest.onerror = function() {
        console.error("delSite error", this.error);
        //displayActionFailure(this.error);
    }  
}

function delPalavra(event) {
    // retrieve the name of the task we want to delete 
    var dataId = parseInt(event.target.getAttribute('data-id'));

    // open a database transaction and delete the task, finding it by the name we retrieved above
    var transaction = db.transaction(["palavra"], "readwrite");
    var objectStore = transaction.objectStore("palavra");
    var objectStoreRequest = objectStore.delete(dataId);

    // report that the data item has been deleted
    objectStoreRequest.onsuccess = function(event) {
	    // delete the parent of the button, which is the list item, so it no longer is displayed
    	displayPalavraList();
	    console.log('Palavra \"' + dataId + '\" deleted.');
    }
    
    transaction.onerror = function() {
        console.error("delPalavra error", this.error);
        //displayActionFailure(this.error);
    }
      
    transaction.onabort = function() {
		console.error("delPalavra error", this.error);
		//displayActionFailure(this.error);
    }
        
    objectStoreRequest.onerror = function() {
        console.error("delPalavra error", this.error);
        //displayActionFailure(this.error);
    }  
}