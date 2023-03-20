window.onload = function () {
	var opcao1 = document.getElementById("opcao1");
	var opcao2 = document.getElementById("opcao2");
	var opcao3 = document.getElementById("opcao3");
	var opcao4 = document.getElementById("opcao4");
	var iframeConteudo = document.getElementById("iframeConteudo");
	
	var op = location.search.split('op=')[1];
	if (typeof op != 'undefined') {
		carregar(parseInt(op));
	} else {
		location.href ="opcoes.html?op=0";
	}
		
}

function carregar(op) {
	
	if (sessionStorage.adminMode) {
		if (sessionStorage.adminMode != '1') {
			op = 0;
		}
	} else {
		op = 0;
	}
	
	switch (op) { 
		case 0:
			opcao1.className = "";
			opcao2.className = "";
			opcao3.className = "";
			opcao4.className = "";
			iframeConteudo.src = "login.html";
			break;
		case 1:
			opcao1.className = "active";
			opcao2.className = "";
			opcao3.className = "";
			opcao4.className = "";
			iframeConteudo.src = "status.html";
	        break;
		case 2:
			opcao1.className = "";
			opcao2.className = "active";
			opcao3.className = "";
			opcao4.className = "";
			iframeConteudo.src = "preferencias.html";
	        break;
		case 3:
			opcao1.className = "";
			opcao2.className = "";
			opcao3.className = "active";
			opcao4.className = "";
			iframeConteudo.src = "relatorio.html";
	        break;
		case 4:
			opcao1.className = "";
			opcao2.className = "";
			opcao3.className = "";
			opcao4.className = "active";
			iframeConteudo.src = "ajuda.html";
	        break;
		case 5:
			opcao1.className = "";
			opcao2.className = "active";
			opcao3.className = "";
			opcao4.className = "";
			iframeConteudo.src = "personalizar.html";
	        break;
		default:
			iframeConteudo.src = "";
	}
}