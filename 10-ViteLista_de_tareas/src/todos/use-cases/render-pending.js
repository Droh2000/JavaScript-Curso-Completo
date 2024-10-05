import todoStore, { Filters } from '../../store/todo.store';
// Modulo para la rederizacion de los elementos
let element;
/**
 * El lugar donde queremos crear los nuevo elementos
 * @param {String} elementId 
 */
export const renderPending = ( elementId ) => {

    if ( !element ) 
        element = document.querySelector( elementId );

    if ( !element )
        throw new Error(`Element ${ elementId } not found`);

    // De lo xportado que nos traiga todos los TODOS
    // LE manddamos el objeto que tiene los filtros
    // .lenght para saber cuantos hay como Pendientes
    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;
}

// Hay que agregar el Export de esto al archivo barril