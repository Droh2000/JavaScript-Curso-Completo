import './style.css';
import { App } from './src/todos/app';
// Al todo como es una exportacion por objeto le pusimos el nombre de 'todoStored'
import todoStore from './src/store/todo.store';

todoStore.initStore();// iniciamos el estado

// Llamamos la funcion para ubicar donde renderizamos la aplicacion
// este es el Id=App del Index.html del proyecto raiz
App('#app');
