var preferenciaData = { ativo: true, exUrl: true, exTitulo: true, hoInicial: "00:00", hoFinal: "23:59", upData: "" };
var faixaData = [{ nome: "0 à 10 anos", categoria: ["Aborto/grupos de defesa", "Conteúdo adulto/maduro", "Álcool/tabaco", "Nudismo", "Violência, ódio e racismo", "Personalizada"] },
{ nome: "11 à 12 anos", categoria: ["Aborto", "Conteúdo Adulto", "Álcool/tabaco", "Nudismo", "Violência, ódio e racismo", "Personalizada"] },
{ nome: "13 à 14 anos", categoria: ["Aborto", "Conteúdo Adulto", "Álcool/tabaco", "Nudismo", "Violência, ódio e racismo", "Personalizada"] },
{ nome: "15 à 16  anos", categoria: ["Aborto", "Conteúdo Adulto", "Álcool/tabaco", "Nudismo", "Violência, ódio e racismo", "Personalizada"] }
];
var categoriaData = [
  { nome: "Personalizada", ativo: "true" },
  { nome: "Aborto/grupos de defesa", ativo: "false" },
  { nome: "Conteúdo adulto/maduro", ativo: "false" },
  { nome: "Anúncios", ativo: "false" },
  { nome: "Álcool/tabaco", ativo: "false" },
  { nome: "Artes/entretenimento", ativo: "false" },
  { nome: "Negócios/economia", ativo: "false" },
  { nome: "Chat/mensagens instantâneas", ativo: "false" },
  { nome: "Culto/ciências ocultas", ativo: "false" },
  { nome: "Instituições culturais", ativo: "false" },
  { nome: "Drogas/drogas ilegais", ativo: "false" },
  { nome: "Educação", ativo: "false" },
  { nome: "E-mail", ativo: "false" },
  { nome: "Para crianças", ativo: "false" },
  { nome: "Downloads de software/freeware", ativo: "false" },
  { nome: "Jogos de azar", ativo: "false" },
  { nome: "Jogos", ativo: "false" },
  { nome: "Governo", ativo: "false" },
  { nome: "Sistemas de prevenção contra roubo e proxy", ativo: "false" },
  { nome: "Integridade", ativo: "false" },
  { nome: "Humor/piadas", ativo: "false" },
  { nome: "Habilidades criminosas/questionáveis", ativo: "false" },
  { nome: "Tecnologia da informação/computadores", ativo: "false" },
  { nome: "Leilões na Internet", ativo: "false" },
  { nome: "Internet Watch Foundation CAIC", ativo: "false" },
  { nome: "Roupas íntimas/trajes de banho", ativo: "false" },
  { nome: "Pesquisa de trabalho", ativo: "false" },
  { nome: "Malware", ativo: "false" },
  { nome: "Militar", ativo: "false" },
  { nome: "Multimídia", ativo: "false" },
  { nome: "Notícias/mídia", ativo: "false" },
  { nome: "Nudismo", ativo: "false" },
  { nome: "Banco online", ativo: "false" },
  { nome: "Corretagem/ações online", ativo: "false" },
  { nome: "Pay to Surf", ativo: "false" },
  { nome: "Relacionamentos e namoro", ativo: "false" },
  { nome: "Política e grupos de defesa", ativo: "false" },
  { nome: "Pornografia", ativo: "false" },
  { nome: "Setor imobiliário", ativo: "false" },
  { nome: "Referência", ativo: "false" },
  { nome: "Religião", ativo: "false" },
  { nome: "Restaurantes e refeições", ativo: "false" },
  { nome: "Mecanismos de pesquisa e portais", ativo: "false" },
  { nome: "Educação sexual", ativo: "false" },
  { nome: "Compras", ativo: "false" },
  { nome: "Redes sociais", ativo: "false" },
  { nome: "Sociedade e estilo de vida", ativo: "false" },
  { nome: "Esportes/recriação", ativo: "false" },
  { nome: "Viagens", ativo: "false" },
  { nome: "Grupos de notícias Usenet", ativo: "false" },
  { nome: "Veículos", ativo: "false" },
  { nome: "Violência, ódio e racismo", ativo: "false" },
  { nome: "Armas", ativo: "false" },
  { nome: "Comunicações na Web", ativo: "false" },
  { nome: "Hospedagem da Web", ativo: "false" }
];
var siteData = [{ url: "www.gynpages.com", categoria: ["Aborto/grupos de defesa"], bloqueado: "false" },
{ url: "www.abortionfacts.com", categoria: ["Aborto/grupos de defesa"], bloqueado: "false" },
{ url: "www.humorbomb.org", categoria: ["Conteúdo adulto/maduro"], bloqueado: "false" },
{ url: "www.steakandcheese.com", categoria: ["Conteúdo adulto/maduro"], bloqueado: "false" },
{ url: "www.punchbaby.com", categoria: ["Conteúdo adulto/maduro"], bloqueado: "false" },
{ url: "www.adblade.com", categoria: ["Anúncios"], bloqueado: "false" },
{ url: "www.netvert.biz", categoria: ["Anúncios"], bloqueado: "false" },
{ url: "www.budweiser.com", categoria: ["Álcool/tabaco"], bloqueado: "false" },
{ url: "www.coors.com", categoria: ["Álcool/tabaco"], bloqueado: "false" },
{ url: "www.imdb.com", categoria: ["Artes/entretenimento"], bloqueado: "false" },
{ url: "www.eonline.com", categoria: ["Artes/entretenimento"], bloqueado: "false" },
{ url: "www.moviephone.com", categoria: ["Artes/entretenimento"], bloqueado: "false" },
{ url: "www.ge.com", categoria: ["Negócios/economia"], bloqueado: "false" },
{ url: "www.sunbeam.com", categoria: ["Negócios/economia"], bloqueado: "false" },
{ url: "www.web.icq.com/icqchat", categoria: ["Chat/mensagens instantâneas"], bloqueado: "false" },
{ url: "www.aim.com", categoria: ["Chat/mensagens instantâneas"], bloqueado: "false" },
{ url: "www.messenger.msn.com", categoria: ["Chat/mensagens instantâneas"], bloqueado: "false" },
{ url: "www.phlums.com", categoria: ["Culto/ciências ocultas"], bloqueado: "false" },
{ url: "www.terrificator.com", categoria: ["Culto/ciências ocultas"], bloqueado: "false" }
];

var palavraData = [{ palavra: "aborto", categoria: ["Aborto"], bloqueado: "false" },
{ palavra: "tesão", categoria: ["Conteúdo Adulto"], bloqueado: "false" },
{ palavra: "alcool", categoria: ["Álcool/tabaco"], bloqueado: "false" },
{ palavra: "maconha", categoria: ["Drogas/drogas ilegais"], bloqueado: "false" },
{ palavra: "nudismo", categoria: ["Nudismo"], bloqueado: "false" },
{ palavra: "banco", categoria: ["Banco online"], bloqueado: "false" },
{ palavra: "jogo", categoria: ["Jogos"], bloqueado: "false" },
{ palavra: "poker", categoria: ["Jogos de azar"], bloqueado: "false" },
{ palavra: "futebol", categoria: ["Esportes/recriação"], bloqueado: "false" },
{ palavra: "cabeça chata", categoria: ["Violência, ódio e racismo"], bloqueado: "false" },
{ palavra: "passagem aérea", categoria: ["Viagens"], bloqueado: "false" },
];

var userData = { login: "admin", senha: "admin" };

var dbprincipal;

const DB_NAME = 'tourmaline';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)

// Used to keep track of which view is displayed to avoid uselessly reloading it
var current_view_pub_key;

function create_database() {
  console.log("openDb ...");

  const request = window.indexedDB.open(DB_NAME, DB_VERSION);

  request.onerror = function (event) {
    console.error("openDb Erro: ", event.target.errorCode);
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result

    dbUpgrade(db);

    console.log("openDb.onupgradeneeded");
  }

  request.onsuccess = function () {
    dbprincipal = DBOpenRequest.result;
    console.log("openDb DONE");
  };

}

function dbUpgrade(db) {
  console.log("openDb.onupgradeneeded");

  //Cria os objetos
  let preferenciaStore = db.createObjectStore(
    "preferencia", { keyPath: "id", autoIncrement: true }
  );
  preferenciaStore.transaction.oncomplete = function (event) {
    console.log("preferenciaStore Criado.")
  }

  let faixaStore = db.createObjectStore(
    "faixa", { keyPath: "id", autoIncrement: true }
  );
  faixaStore.createIndex("nome", "nome", { unique: true });
  faixaStore.createIndex("categoria", "categoria", { unique: false });
  faixaStore.transaction.oncomplete = function (event) {
    console.log("faixaStore Criado.")
  }

  let categoriaStore = db.createObjectStore(
    "categoria", { keyPath: "id", autoIncrement: true }
  );
  categoriaStore.createIndex("nome", "nome", { unique: true });
  categoriaStore.transaction.oncomplete = function (event) {
    console.log("categoriaStore Criado.")
  }

  let siteStore = db.createObjectStore(
    "site", { keyPath: "id", autoIncrement: true }
  );
  siteStore.createIndex("url", "url", { unique: true });
  siteStore.createIndex("categoria", "categoria", { unique: false });
  siteStore.createIndex("bloqueado", "bloqueado", { unique: false });
  siteStore.createIndex("categoria, url", ["categoria", "url"], { unique: false });
  siteStore.transaction.oncomplete = function (event) {
    console.log("siteStore Criado.")
  }

  let palavraStore = db.createObjectStore(
    "palavra", { keyPath: "id", autoIncrement: true }
  );
  palavraStore.createIndex("palavra", "palavra", { unique: true });
  palavraStore.createIndex("categoria", "categoria", { unique: false });
  palavraStore.createIndex("bloqueado", "bloqueado", { unique: false });
  palavraStore.transaction.oncomplete = function (event) {
    console.log("palavraStore Criado.")
  }

  let acessoStore = db.createObjectStore(
    "acesso", { keyPath: "id", autoIncrement: true }
  );
  acessoStore.createIndex("data", "data", { unique: false });
  acessoStore.transaction.oncomplete = function (event) {
    console.log("acessoStore Criado.")
  }

  let userStore = db.createObjectStore(
    "user", { keyPath: "login", autoIncrement: false }
  );
  userStore.transaction.oncomplete = function (event) {
    console.log("userStore Criado.")
  }

  //dbDados();

  preferenciaStore.add(preferenciaData);

  /*for (i in faixaData) {
    faixaStore.add(faixaData[i]);
  }

  for (i in categoriaData) {
    categoriaStore.add(categoriaData[i]);
  }

  for (i in siteData) {
    siteStore.add(siteData[i]);
  }

  for (i in palavraData) {
    palavraStore.add(palavraData[i]);
  }*/

  userStore.add(userData);
}