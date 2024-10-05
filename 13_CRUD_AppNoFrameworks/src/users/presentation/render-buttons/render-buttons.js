import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';// Diseno de los botones
// Estos son botones para mostrar abajo de la tabla
/**
 * 
 * @param {HTMLDivElement} element 
 */
// element es donde queremos que renderize esto
export const renderButtons = ( element ) => {
    // Boton para avanzar a la siguiente pagina
    const nextButton = document.createElement('button');
    nextButton.innerText = ' Next >';
    // Boton para retroceder 
    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev ';
    // Mostrar la pagina actual donde nos encontramos
    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page'// lo identificamos con un ID
    currentPageLabel.innerText = usersStore.getCurrentPage();// Con ayuda del Stored obtenemos la pagina actual
    // Agregamos lo creado al elemento donde queremos renderizarlos, agregandolos en el orden que los especificamos aqui
    element.append( prevButton, currentPageLabel, nextButton );

    // Eventos
    nextButton.addEventListener('click', async() => {
        // Ya tenemos el Stored para avanzar a la siguiente pagina
        // Esto es porque esta funcion intenta cargar el valor que tenga actualmente y si hay registros entonces cambia la pagina
        // y establece los usuarios
        await usersStore.loadNextPage();
        // Indicamos cual es la pagina actual y mostrarla en el Label
        // Aqui ya tenemos actualizado cual es el nuevo valor
        currentPageLabel.innerText = usersStore.getCurrentPage();
        // Para cabiar la tabla con los nuevo datos tenemos que renderizar la tabla que como ya existe la tabla
        // solo cambia el contenido interno de la tabla
        renderTable( element );
    });

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();// llamamos el metodo del Stored para retroceder la pagina (Este ya contiene la logica)
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

}

