import { Todo } from '../models/todo.model';
import { createTodoHTML } from './';

// Definimos la varaible afuera para preguntar con el IF
let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {
    // Nececitamos saber en que elementos HTML nececitamos insertarlo
    //      pero solo lo queremos recibir como un String y esta funcion lo buscara con el DoOm
    // Y tambien nececitamos la lista de los TODOS
    if ( !element )// Si el elementos NO existe
        // Selecionamos el elemento HTML (HAcemos la llamda al DOOM)
        element = document.querySelector( elementId );
    // Si no encuentra el elementos en el DOOM
    if ( !element ) throw new Error(`Element ${ elementId } not found`);
    // PAra que cada vez que llamemos la funcion el contenido este limpio
    // para que no acumulen los mismo con los mismo
    element.innerHTML = '';
    // Recorremos cada uno de los TODOS que tengamos
    todos.forEach( todo => {
        // Se los insertamos al HTML
        // Usando otroa funcion en la carpeta Uses-cases mandandole el TODO que estamos iterando en ese momento
        element.append( createTodoHTML(todo) )
    });

    // Esta funcion NO retorna NADA ya que solo genera la Todos en el HTML
}

// Esta funcion se importo en el 'index.js' de la carpeta 'Use-cases'
// que es el archivo barril de las importanciones para despues mandar a llamar esta funcion 
// en el 'ápp.js' 