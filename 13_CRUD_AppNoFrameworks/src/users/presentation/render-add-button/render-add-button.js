import { showModal } from '../render-modal/render-modal';
import './render-add-button.css';
// Este boton es paramostrarnos una ventana modal donde podremos ingresar los datos de nuevos usuarios
/**
 * 
 * @param {HTMLDivElement} element 
 */
/*
    Como nota adicional

    Cuando nos creamos un boton y queremos que este sea reutilizable
    nosotros lo podemos pasar como parametros el "callback" que seria la funcion
    que queremos ejecutar cuando se hace click en el boton quedando los parametros como
    (element, callback)

    Se puede especificar en la documentacion:  
        @param {() => void} callback  -> Indicando que solo es una funcion que se puede llamar

    Dentro del Listener se agrega:
        if(!callback) return; -> Si no existe el callback entonces no haga nada

        callback(); -> Si existe el callback entonces que lo llame
        Con esto estamos delegando el evento a que el padre sea el que le indique que hacer

    Asi dentro del "users-app.js" al renderizar el boton en los parametros le indicamos lo que queremos que realize
    renderAddButton( element, () => {console.log("Desde el Padre")} );

    En este caso este boton no es reutilizable por el CSS porque todo estarian en la misma posicion
*/
export const renderAddButton = ( element ) => {
    // Creamos el boton
    const fabButton = document.createElement('button');
    fabButton.innerText = '+';
    // Esto podria ser con el ClassName
    fabButton.classList.add('fab-button');// Le agregamos esta clase al boton
    // Lo agregamos al HTML
    element.append( fabButton );

    //TODO:
    fabButton.addEventListener('click', () =>{
        showModal(); // Funcion que muestra el modal
    });

}
