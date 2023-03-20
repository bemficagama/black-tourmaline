import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>BlackTourmaline</h1>

      <div className="d-flex flex-row m-3">
        <div className="p-2 align-self-center">
          <img src="logo190.png" alt="" />
        </div>
        <div className="p-2">
          <h3>Uma extensão para Google Chrome que é um controle parental</h3>
          <p className="text-start">Plug-in para Google Chrome, com objetivo de fazer um controle parental 
            de sites acessados, tendo como funcionalidades a definição de preferências 
            do plug-in, personalização de categorias, seleção de categorias de sites 
            pré-estabelecidos e classificadas por faixa etária, definição de horário 
            de funcionamento, gerenciamento de categorias, gerenciamento de faixa 
            etária, atualização automática das categorias pré-estabelecidas, 
            servidor web service que responderá as atualizações de categorias 
            pré-estabelecidas, relatório de tentativas de acessos.</p>
        </div>
      </div>
    </div>
  );
}

export default App;