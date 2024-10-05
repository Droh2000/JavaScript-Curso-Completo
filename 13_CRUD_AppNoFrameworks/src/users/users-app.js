import usersStore from './store/users-store';
import { renderTable } from './presentation/render-table/render-table';
import { renderButtons } from './presentation/render-buttons/render-buttons';
import { renderAddButton } from './presentation/render-add-button/render-add-button';
import { renderModal } from './presentation/render-modal/render-modal';

import { saveUser } from './use-cases/save-user';

// Aqui es donde vamos a mostrar los componentes creados juntandolos para el HTML
// Esta funcion la debemos meter dentro del main.js (Este es el archivo que se llama cuando se inicia la aplicaicon)
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async( element ) => {
    // Antes de obtener la informacion mostramos que esta cargando
    element.innerHTML = 'Loading...';
    await usersStore.loadNextPage();// Importamos la pagina que obtiene un usuario por pagina
    element.innerHTML = ''; // Esto es para quitar el loading porque ya tenemos la Data
    // Leer el Stored y renderizar los elementos que esten llamando "getUsers" de users-store.js
    // Para mostrarlos vamos a crear una tabla en HTML en la carpeta Presentation
    renderTable( element ); // Mostramos la tabla que creamos en la carpeta Presentation mandamos el element donde queremos renderizarla
    renderButtons( element ); // Mostrar botones debajo de la tabla
    renderAddButton( element ); // Boton para mostrar una ventana
    // A este le mandamos como segundo agumento un callback asincrono donde esperamos que se nos mande un objeto parecido a un usuairo
    renderModal( element, async( userLike ) => {
        // aplicamos la funciones que tenemos en el "use-cases"
        const user = await saveUser( userLike ); // Funcion que verifica si guarda un nuevo usuario o actualiza uno existente
        usersStore.onUserChanged( user );// Actualizamos el Stored mandandole el nuevo usuario
        renderTable();// Volvemos a renderizar la tabla para mostrar los nuevos datos
    });
    // Podemos seguir con la misma idea de mandar otra funcion pero todo lo que nosotros ocupamos ya esta colocado
    // en el Stored asi que podemos mandar a llamar todo por ahi, ademas en el "renderTable()" espera un elemento
    // pero cuando la tabla ya esta creada no hace falta por lo que este element es opcional


}