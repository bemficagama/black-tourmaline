window.onload = function() {
  logout();
}

function logout() {
	if (localStorage['adminMode'] == '1') {
		localStorage['adminMode'] = '0';
		window.location.href="login.html";
		return;
	}
}