import { Todo } from '../models/todo.model';


/**
 *  Aqui vamos a regresar el componente HTML que queremos crear
 * @param {Todo} todo 
 */
export const createTodoHTML = ( todo ) => {
    // Si no nos mandan un TODO
    if ( !todo ) throw new Error('A TODO object is required');

    // Como en un inicio llamabamo mucho a 'todo.Algo'
    // Desestructuraamos el contenido para obtener de todo solo lo que nos interesa
    const { done, description, id } = todo;

    // El html como es poco codigo lo podemos tener directamente aqui y no importarlo
    // se copio de las lineas que estan comentandas del index.html LE borramos el <li> porque ya lo estamos creando abajo
    // Va a cambiar segun las validaciones necesarias que hagamos con JS entre ${}:
    //      - Si el todo.Done esta en true ? le ponemos el 'checked' si no solo un String vacio
    //      - Cambiamos la descripicon para cada TODO
    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked': '' }>
            <label>${ description }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;
    // Nos vamos a crear un List Item
    const liElement = document.createElement('li');
    liElement.innerHTML = html; // LE agregamos el html que tenemos definido arriba
    // Le agregagamos como atributo el ID para saber cual TODO es y tenerlo identificado
    liElement.setAttribute('data-id', id );

    // Le agragamos la clase completed a los TODO si el done es true
    if ( todo.done )
        liElement.classList.add('completed');
    

    return liElement;
}

// HAy que agregar este archivo a nuestro archivo barril