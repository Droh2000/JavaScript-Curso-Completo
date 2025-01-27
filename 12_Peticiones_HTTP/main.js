import './style.css';
import javascriptLogo from './javascript.svg';
import { BreakingbadApp } from './src/breakingbad/breakingbad-app';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <!--Le agregamos este ID-->
    <h1 id="app-title">Hello Vite!</h1>
    <!--Aqui es donde vamos a montar el codigo-->
    <div class="card">
      
    </div>
    
  </div>
`;

const element = document.querySelector('.card');
// Importamos nuestro componente Principal y le mandamos a llamar el elemento HTML donde
// queremos renderizar todo que seria con el ID card
BreakingbadApp( element );
