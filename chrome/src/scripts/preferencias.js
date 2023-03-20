var db = {};

window.onload = function () {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	
	var DBOpenRequest = window.indexedDB.open("tourmaline", 1);

	DBOpenRequest.onsuccess = function(event) {
		db = DBOpenRequest.result;
		disparaListeners();
		displayPreferencia();
		displayCategoriaList();
		displayFaixaList();
	}
	
	DBOpenRequest.onupgradeneeded = function(event) {
		db = event.target.result

    	dbUpgrade(db);
	}
};

function disparaListeners() {
	var botaoAtivar = document.getElementById("botaoAtivar");
	var exUrl = document.getElementById("exUrl");
	var exTitulo = document.getElementById("exTitulo");
	var exMeta = document.getElementById("exMeta");
	var exConteudo = document.getElementById("exConteudo");
	var hoInicial = document.getElementById("hoInicial");
	var hoFinal = document.getElementById("hoFinal");
	var botaoSelecionar = document.getElementById("botaoSelecionar");
	var botaoSalvar = document.getElementById("botaoSalvar");
	var botaoPersonalizar = document.getElementById("botaoPersonalizar");
	var botaoSenha = document.getElementById("botaoSenha");
	var botaoUpdate = document.getElementById("botaoUpdate");

	botaoAtivar.onchange = function (event) {
	    console.log("Ativar ...");
	    var transaction = db.transaction(['preferencia'], 'readwrite');
		var objectStore = transaction.objectStore('preferencia');
		var request = objectStore.get(1);
		
		request.onsuccess = function(evt) {
			var value = request.result;
			value.ativo = event.target.checked;
			objectStore.put(value);
		};
	};
	
	exUrl.onchange = function (event) {
	    console.log("Ativar ...");
	    var transaction = db.transaction(['preferencia'], 'readwrite');
		var objectStore = transaction.objectStore('preferencia');
		var request = objectStore.get(1);
		
		request.onsuccess = function(evt) {
			var value = request.result;
			value.exUrl = event.target.checked;
			objectStore.put(value);
		};
	};
	
	exTitulo.onchange = function (event) {
	    console.log("Ativar ...");
	    var transaction = db.transaction(['preferencia'], 'readwrite');
		var objectStore = transaction.objectStore('preferencia');
		var request = objectStore.get(1);
		
		request.onsuccess = function(evt) {
			var value = request.result;
			value.exTitulo = event.target.checked;
			objectStore.put(value);
		};
	};
	
	hoInicial.onchange = function (event) {
	    console.log("Ativar ...");
	    var transaction = db.transaction(['preferencia'], 'readwrite');
		var objectStore = transaction.objectStore('preferencia');
		var request = objectStore.get(1);
		
		request.onsuccess = function(evt) {
			var value = request.result;
			value.hoInicial = event.target.value;
			objectStore.put(value);
		};
	};
	
	hoFinal.onchange = function (event) {
	    console.log("Ativar ...");
	    var transaction = db.transaction(['preferencia'], 'readwrite');
		var objectStore = transaction.objectStore('preferencia');
		var request = objectStore.get(1);
		
		request.onsuccess = function(evt) {
			var value = request.result;
			value.hoFinal = event.target.value;
			objectStore.put(value);
		};
	};

	botaoPersonalizar.onclick = function () {
	    console.log("Personalizar ...");
	    window.frameElement.ownerDocument.location.href ="opcoes.html?op=5";
	}
	
	botaoSenha.onclick = function () {
	    console.log("Senha ...");
	    var senhaAtual = document.getElementById("senhaAtual");
	    var senhaNova = document.getElementById("senhaNova");
	    var senhaConfirma = document.getElementById("senhaConfirma");
	    if (senhaAtual.value != null) {
	    	var transaction = db.transaction(['user'], 'readwrite');
	    	var objectStore = transaction.objectStore('user');
	    	var request = objectStore.get("admin");
	    	
	    	request.onsuccess = function(evt) {
	    		var value = request.result;
	    		
	    		if (value.senha == senhaAtual.value) {
	    			if (senhaNova.value != senhaConfirma.value) {
	    				alert("Senhas não conferem!");
	    			} else {
		    			value.senha = senhaNova.value;
		    			objectStore.put(value);
		    			alert("Senha Alterada com Sucesso!");
	    			}
	    		} else {
	    			alert("Senha Inválida!");
	    		}
	    		
	    	};
	    }
	}
	
	botaoUpdate.onclick = function () {
		var siteTotal;
		var categoriaTotal;
		var palavraTotal;
		var lbStatus = document.getElementById("lbStatus");
		lbStatus.innerHTML = "Atualizando 0/4 Iniciando ...";
		
		getJSON('http://curupira.local:8080/index.php?r=faixa/chrome-index').then(function(data) {
			var transaction = db.transaction(['faixa'], 'readwrite');
	    	var faixaStore = transaction.objectStore('faixa');
	    	var request = faixaStore.clear();
	    	// report the success of our clear operation
	    	request.onsuccess = function(event) {
		    	for (var i in data.faixa) {
		    		var categorias = new Array();
		    		for (var j in data.faixa[i].categorias) {
		    			categorias[j] = data.faixa[i].categorias[j].nome;
		    		}
		    	 	faixaStore.add({id: parseInt(data.faixa[i].idFaixa), nome: data.faixa[i].nome, categoria: categorias});
		    	}
		    	displayFaixaList();
	    	}
	    	
	    	request.onerror = function(event) {
	    		alert("erro: "+event.target.errorCode);
	    	}
		    //result.innerText = data.result; //display the result in an HTML element
		}, function(status) { //error detection....
		  alert('Something went wrong.');
		});
		
		getJSON('http://curupira.local:8080/index.php?r=categoria/chrome-index').then(function(data) {
			var transaction = db.transaction(['categoria'], 'readwrite');
	    	var categoriaStore = transaction.objectStore('categoria');
	    	var request = categoriaStore.clear();
	    	// report the success of our clear operation
	    	
	    	request.onsuccess = function(event) {
	    		categoriaStore.add({id: 0, nome: "Personalizada", ativo: "true"});
		    	for (var i in data.categoria) {
		    	 	categoriaStore.add({id: parseInt(data.categoria[i].idCategoria), nome: data.categoria[i].nome, ativo: "false"});
		    	}
		    	displayCategoriaList();
	    	}
	    	
	    	request.onerror = function(event) {
	    		alert("erro: "+event.target.errorCode);
	    	}
	    	
		    //result.innerText = data.result; //display the result in an HTML element
		}, function(status) { //error detection....
		  alert('Something went wrong.');
		});
		
		getJSON('http://curupira.local:8080/index.php?r=chave/chrome-index').then(function(data) {
			var transaction = db.transaction(['palavra'], 'readwrite');
	    	var palavraStore = transaction.objectStore('palavra');
	    	var request = palavraStore.clear();
	    	// report the success of our clear operation
	    	request.onsuccess = function(event) {
		    	for (var i in data.chave) {
		    		var categorias = new Array();
		    		for (var j in data.chave[i].categorias) {
		    			categorias[j] = data.chave[i].categorias[j].nome;
		    		}
		    	 	palavraStore.add({id: parseInt(data.chave[i].idChave), palavra: data.chave[i].palavra, categoria: categorias, bloqueado: "false"});
		    	}
	    	}
	    	
	    	request.onerror = function(event) {
	    		alert("erro: "+event.target.errorCode);
	    	}
	    	
		    //result.innerText = data.result; //display the result in an HTML element
		}, function(status) { //error detection....
		  alert('Something went wrong.');
		});
		
		getJSON('http://curupira.local:8080/index.php?r=url/chrome-index').then(function(data) {
			var transaction = db.transaction(['site'], 'readwrite');
	    	var siteStore = transaction.objectStore('site');
	    	var request = siteStore.clear();
	    	// report the success of our clear operation
	    	request.onsuccess = function(event) {
	    		
		    	for (var i in data.site) {
		    		var categorias = new Array();
		    		for (var j in data.site[i].categorias) {
		    			categorias[j] = data.site[i].categorias[j].nome;
		    		}
		    	 	siteStore.add({id: parseInt(data.site[i].idUrl), url: data.site[i].url, categoria: categorias, bloqueado: "false"});
		    	}
		    	lbStatus.innerHTML = "Atualizado com sucesso!";
	    	}
	    	
	    	request.onerror = function(event) {
	    		alert("erro: "+event.target.errorCode);
	    	}
	    	
		    //result.innerText = data.result; //display the result in an HTML element
		}, function(status) { //error detection....
		  alert('Something went wrong.');
		});
		
		var preferenciaTransaction = db.transaction(['preferencia'], 'readwrite');
		var preferenciaStore = preferenciaTransaction.objectStore('preferencia');
		var preferenciaRequest = preferenciaStore.get(1);
		
		preferenciaRequest.onsuccess = function(evt) {
			var value = preferenciaRequest.result;
			var dataAtual = new Date();
				
			value.upData = dataAtual.toLocaleDateString();			
			preferenciaStore.put(value);
		};
	}
}

/**
 * @param {IDBObjectStore=} store
 */
function displayPreferencia() {
	console.log("displayPreferencia");

	var transaction = db.transaction(['preferencia'], 'readonly');
	var objectStore = transaction.objectStore('preferencia');
	var request = objectStore.get(1);

	var exUrl = document.getElementById('exUrl');
	var exTitulo = document.getElementById('exTitulo');
	var hoInicial = document.getElementById('hoInicial');
	var hoFinal = document.getElementById('hoFinal');
	var ativo = document.getElementById('botaoAtivar');
	
	request.onsuccess = function(evt) {
		var value = request.result;
			
		exUrl.checked = value.exUrl;
		exTitulo.checked = value.exTitulo;
		hoInicial.value = value.hoInicial;
		hoFinal.value = value.hoFinal;
		ativo.checked = value.ativo;
	};
}

/**
 * @param {IDBObjectStore=} store
 */
function displayFaixaList() {
	var faixa_list = document.getElementById('faixaItems');
	while(faixa_list.tBodies[0].hasChildNodes()){                
		faixa_list.tBodies[0].removeChild(faixa_list.tBodies[0].firstChild);
	}
	console.log("displayFaixaList");

	var transaction = db.transaction(['faixa'], 'readonly');
	var objectStore = transaction.objectStore('faixa');
	var indice = objectStore.index('nome');
 
	indice.openCursor().onsuccess = function(evt) {
		var cursor = evt.target.result;
		// If the cursor is pointing at something, ask for the data
		if (cursor) {
			console.log("displayFaixaList cursor:", cursor);
			var value = cursor.value;
			
			var linha = faixa_list.tBodies[0].insertRow(-1);
			var celula1 = linha.insertCell(-1);
			var link1 = document.createElement ("A");
			link1.value = value.nome;
			link1.innerHTML = value.nome;
			link1.setAttribute('data-categoria', value.categoria);
			celula1.appendChild(link1);
			link1.onclick = function(event) {
				selecionaPorFaixa(event);
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
function displayCategoriaList() {
	var categoria_list = document.getElementById('categoriaItems');
	while(categoria_list.tBodies[0].hasChildNodes()){                
		categoria_list.tBodies[0].removeChild(categoria_list.tBodies[0].firstChild);
	}
	
	console.log("displayCategoriaList");

	var transaction = db.transaction(['categoria'], 'readonly');
	var objectStore = transaction.objectStore('categoria');
	var indice = objectStore.index('nome');

	indice.openCursor().onsuccess = function(evt) {
		var cursor = evt.target.result;
		
		// If the cursor is pointing at something, ask for the data
		if (cursor) {
			console.log("displayFaixaList cursor:", cursor);
			var value = cursor.value;

			//var list_item = $('<tr></tr>');
			var linha = categoria_list.tBodies[0].insertRow(-1);
			var celula1 = linha.insertCell(-1);
		    var celula2 = linha.insertCell(-1);
		    var ckCategoria = document.createElement("input");
		    ckCategoria.type = "checkbox";
		    ckCategoria.checked = (value.ativo == "true");
		    ckCategoria.value = value.id;
		    ckCategoria.setAttribute('data-categoria', value.nome);
		    ckCategoria.onchange = function(event) {
				if (event.target.checked) {
					selecionaPorCategoria(event.target.getAttribute('data-categoria'), "true");
				} else {
					selecionaPorCategoria(event.target.getAttribute('data-categoria'), "false");
				}
					
			}
		    celula1.appendChild(ckCategoria);
		    var lbCategoria = document.createElement ("label");
		    lbCategoria.value = value.nome;
		    lbCategoria.innerHTML = value.nome;
		    celula2.appendChild(lbCategoria);

		    // Move on to the next object in store
		    cursor.continue();
		} else {
			console.log("No more entries: Categoria");
		}
	};
}

/**
 * @param {integer=} id
 * @param {boolean=} ativo
 * @param {boolean=} exUrl
 * @param {boolean=} exTitulo
 * @param {boolean=} exMeta
 * @param {boolean=} exConteudo
 * @param {time=} hoInicial
 * @param {time=} hoFinal
 */
function updatePreferencia() {
  console.log("updatePreferencia");

  if (typeof store == 'undefined')
    store = getObjectStore("preferencia", "readwrite");

  var ativo = $('#botaoAtivar').prop('checked');
  var exUrl = $('#exUrl').prop('checked');
  var exTitulo = $('#exTitulo').prop('checked');
  var exMeta = $('#exMeta').prop('checked');
  var exConteudo = $('#exConteudo').prop('checked');
  var hoInicial = $('#hoInicial').prop('value');
  var hoFinal = $('#hoFinal').prop('value');

  var req = store.get(1);
  req.onsuccess = function(evt){
    //var data = req.result;
    var data = {};
    data.ativo = ativo;
    data.exUrl = exUrl;
    data.exTitulo = exTitulo;
    data.exMeta = exMeta;
    data.exConteudo = exConteudo;
    data.hoInicial = hoInicial;
    data.hoFinal = hoFinal;
    data.id = 1;
    //do the update
    var objRequest = store.put(data);
    objRequest.onsuccess = function(ev){
      console.log('Sucesso ao atualizar registro');
      create_database(updateCategoria);
      };
    objRequest.onerror = function(ev){
      console.log('Erro ao tentar atualizar registro');
      };
  };
  req.onerror = function(evt){
    console.log('Erro ao tentar obter registro');
  };
}

function selecionaPorFaixa(event) {
	var categorias = event.target.getAttribute('data-categoria').split(",");
	for (var item in categorias) {
		selecionaPorCategoria(categorias[item], "true");
	}
	displayCategoriaList();
}

function selecionaPorCategoria(categoria, valor) {
	var transaction = db.transaction(['site'], 'readwrite');
	var objectStore = transaction.objectStore('site');
	var indice = objectStore.index('categoria');
	
	var keyRangeValue = IDBKeyRange.only([categoria]);
	indice.openCursor(keyRangeValue).onsuccess = function(evt) {
		var cursor = evt.target.result;
		// If the cursor is pointing at something, ask for the data
		if (cursor) {
			var value = cursor.value;
			
			value.bloqueado = valor;
			
			cursor.update(value);
			// Move on to the next object in store
			cursor.continue();
		
		// This counter serves only to create distinct ids
		} else {
			console.log("No more entries: Site");
		}
	};
	ativarCategoria(categoria, valor);
}

function ativarCategoria (categoria, valor) {
	var transaction = db.transaction(['categoria'], 'readwrite');
	var objectStore = transaction.objectStore('categoria');
	var indice = objectStore.index('nome');
	
	var keyRangeValue = IDBKeyRange.only(categoria);
	indice.openCursor(keyRangeValue).onsuccess = function(evt) {
		var cursor = evt.target.result;
		// If the cursor is pointing at something, ask for the data
		if (cursor) {
			var value = cursor.value;
			
			value.ativo = valor;
			
			cursor.update(value);
			// Move on to the next object in store
			cursor.continue();
		
		// This counter serves only to create distinct ids
		}
	};
}

function getJSON(url) {
	return new Promise(function(resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('get', url, true);
	    xhr.responseType = 'json';
	    xhr.onload = function() {
	    	var status = xhr.status;
	    	if (status == 200) {
	    		resolve(xhr.response);
	    	} else {
	    		reject(status);
	    	}
	    };
	    xhr.send();
	  });
}