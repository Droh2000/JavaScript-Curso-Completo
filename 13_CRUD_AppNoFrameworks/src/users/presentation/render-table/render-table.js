import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id'
import './render-table.css';// Esto es de manera global (Lo que pongamos aqui va afectar aqui de forma global)
// Se va a cargar hasta que el componente sea llamado

// Vamos a crear una tabla HTML pero como la queremos mantener en memeoria para solo cambiarla y no recrearla
// en esta variale la creamos y asi solo existira en este Scope 
let table;

// Esta funcion no le ponemos "export" porque no va a salir de aqui
const createTable = () => {
    // Creamos la tabla HTML
    const table = document.createElement('table');
    // Headers (seccion de la tabla en aprticular)
    const tableHeaders = document.createElement('thead');
    // Definimos el HTML 
    // tr -> Table Row  y  th -> Table Header
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FistName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;
    // Aqui es donde vamos a insertar las informacion de los elementos
    const tableBody = document.createElement('tbody');
    table.append( tableHeaders, tableBody )// En un inicio no tienen nada, solo esta es el Espacio HTML
    return table;
}

// Logica de los Eventos de la tabla creada la logica por separada
/**
 * @param {MouseEvent} event 
 */
// Para tener el tipo exacto de lo que esperamos (En este caso "MouseEvent") podemos ver en la ayuda del IDE
// al poner la funcion dentro del Listener correspondiente donde se llama la funcion, ahi nos dice el tipo que se espera
const tableSelectListener = (event) => { // Recibimos el evento
    // Con "event.target" sabemos a que le estamos haciendo click con esto sabemos con un Console.log de donde tomar los datos
    // Esto es una forma de hacerlo porque tambien se puede hacer tomando la clase
    // Asi si hacemos click en otra parte de la table obtendremos NULL y en donde queremos obtenemos informacion del usuario
    const element = event.target.closest('.select-user');
    if ( !element ) return;// Si es null no hace nada
    // Tomamos el ID y buscamos donde se almacena este valor
    const id = element.getAttribute('data-id');
    showModal(id);// mostramos la ventana y le mandamos el Id del usuario seleccionado (En este caso el ID siempre va a ser un String)
}

// Evento para madar a llamar la eliminacion que se hace atravez de la ejecuion del HTTP DELETE
/**
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async(event) => {
    // Obtenemos el elemento que este mas cercano al .delete-user
    const element = event.target.closest('.delete-user');
    if ( !element ) return;// Si no existe no hace nada

    const id = element.getAttribute('data-id');// Si exite tomamos el ID
    try {
        await deleteUserById(id);// Eliminamos HTTP
        await usersStore.reloadPage();// Recargamos la pagina
        // Tambien podemos actualizar la pagina porque si borramos el ultimo registro queremos irnos a la pagina anterior
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();// Obtenemos la pagina actual en caso que cambie
        renderTable();// volvemos a renderizar la tabla
        
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }

}

// Renderizar la Tabla
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {
    // Cada vez que manemos a llamar esta funcion debemos de saber cuales son los usuarios
    // estos usuarios estan en "getUsers" y como es asyncrono ya sabemos que debemos obtener esos usuarios
    const users = usersStore.getUsers();// Se obtendran los usuarios exactamente como estan en el Stored
    // Si no existe la tabla (La primera vez que mandemos a llamar la funcion no existira)
    if ( !table ) {
        table = createTable();// llamamos la funcion que creamos arriba
        // Insertamos la Tabla en "element" que es un elemento HTML
        // usamos Append para no destruir nada de lo que este previamente  creado
        // Con inner o ReplacheChildren la tabla se insrtara vacia
        element.append( table );

        // Eventos para cuando hacemos click en la tabla y le pasamos el evento correpondiente
        // Solo se manda la funcion como referencia
        table.addEventListener('click', tableSelectListener );
        table.addEventListener('click', tableDeleteListener );
    }
    
    // Si cuando llamemos una segunda o mas vesse la funcion entonces ya existe la tabla
    // porlo que solo debemos repasar el cuerpo de la tabla
    let tableHTML = '';
    // Tomaoms los usuarios (Datos a mostrar) recorriendonos cada uno con este bucle que viene en los arreglos
    users.forEach( user => {
        // user es una instancia de tipo Usuario
        // Creamos un tableRow y le definimos el contenido a la table con td -> TableDescription
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive }</td>
                <td>
                    <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                    |
                    <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
                </td>
            </tr>
        `
    });
    // En "a href" seran las acciones para seleccionar o eliminar, se le agregan ID para saber a cual elemento hacemo click
    // Como aqui es donde estamos renderizando los elementos y los podemos buscar en particular cuando hacemos click en uno de ellos obtenemos 
    // el "data-id" y con esto podemos mostrar el modal y asi sabemos cual elemento a mostrar
    // Para identificar los dos les agregamos clases segun sea para cada uno
    
    // Ahora tomamos esta tabla con el contenido y meterla al "tbody" que definimos arriba
    // con el querySelector podemos buscar dentro de un elemento al igual que con un documento 
    // lo queremos meter dentro del tbody y accedemos a su contenido metiendo esta tabla con contneido
    table.querySelector('tbody').innerHTML = tableHTML;
}