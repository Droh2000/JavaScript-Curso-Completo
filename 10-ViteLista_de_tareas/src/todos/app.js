// Importamos el codigo HTML que copiamos y se le puso '?raw' PAra que Vite lo importe en Crudo y para que no de Error
import html from './app.html?raw';
// A la exportacion dell Todo le pusimo el nombre de 'todoStore'
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

/* Todo Esto se import en el Main.JS */

// Se creo esto objeto para NO esta uno por uno poniendo donde se manden a llamar
// y para tenerlo mejor preparado en un objeto con las clases e ID del HTML donde vamos a manipularlo
const ElementIDs = {
    ClearCompletedButton: '.clear-completed', // PAra cuando borramos UN TODO
    TodoList: '.todo-list', // Ubicacion donde vamos a insertar los TODOS al HTML
    NewTodoInput: '#new-todo-input', // Ubicacion donde vamos a crear un nuevo TODO
    TodoFilters: '.filtro', // Para poder detectar los Filtors y cambiarlos visualmente
    PendingCountLabel: '#pending-count', // Para insertar los Todos con filtro Pendiente
}

/**
 * 
 * @param {String} elementId 
 */
//      Notas de la Codificacion
// Esta funcion creao lo que queremos renderizar en pantalla
export const App = ( elementId ) => {
    // Metodo para Rederizar los TODOS
    const displayTodos = () => {
        // Tomamos de la importada 'todoStore' llamando al metodo con el que obtenemos los TODOS
        // Les tenemos que aplicar un filtro segun el que este seleccionado llamando a '.getCurrentFilter()'
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        // Ya teninedo todo los TODOS los vamos arenderizar en el HTML
        // LO quremos renderizar en la clase 'todo-list' del index.html
        // Mandamos allamar el objeto que tiene lo del HTML
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }

    // PAra saber cuantos TODos tenemos como Pendientes
    // Lo mandamremos a llamar donde sabemos que va ah haber posibles cabios en el Stored
    const updatePendingCount = () => {
        // LLamamos a la funcion importada, le manadamos la referencia HTML donde vamos a renderizar el elementos
        renderPending(ElementIDs.PendingCountLabel);
    }

    // Cuando la función App() se llama (Esta es una funcion anonima AUTOINVOCADA)
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;// Asignamos lo importado de Html
        // Lo que nos manden por paremtro lo buscamos y le agregamos el DIv
        document.querySelector(elementId).append( app );
        // Cada vez que se redibujen los TODOS esto es lo que mandamos a llamar
        displayTodos();
    })();


    // Referencias HTML
    // Como arriba esta la funcion que crea el contido en el HTML
    // Si las creamos arriba no va pasr nada y hasta que se llame la funcion se crean estas referencias
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    /*
        Tenemos que hacer que en la lista de los TODOS que al hacer click nos marque con el Check
        El ListItem esta compuesto de varias cosas dentro del index.html
        Tenemos que tener la referencia a todo los TODOS que estan dentro del elemntos HTML
        Ya tenemos la lista donde estamos creando e insertando los TODOS
        Con el 'todoListUL' escuchamos cada vez que se haga click en el elemento
    */
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    // Lugar del HTML donde vamos a meter los TODOS eliminados
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
    // Queremos que al dar click en un filtro este cambie visualmente de los otros como que este selccionado
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );// Este nos va regresar un arreglo con todos los filtros

    // Listeners (Escuchando cuando alguien presiona una tecla)
    // asi cuando alguien escriba un TODO detectemos el tipo de tecla para insertarlo
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        // Esto significa que cualuiqer tecla que preciones nos saca de aqui
        // Solo si es 13 == "Enter" va a continuar
        if ( event.keyCode !== 13 ) return;
        // Evaluar si tenemos algo de Texto
        // Con 'event.target.value' obtenemos lo que escribio el usuario
        // Con 'trim()' le quitamos los espacios que puedan estar por delante y atras
        if ( event.target.value.trim().length === 0 ) return;
        // llamamos al TODO y le enviamos el texto
        todoStore.addTodo( event.target.value );
        displayTodos(); // PAra que vuelva a renderizar los TODOS
        // PAra que despues de ser insertado el nuevo TODO se borre el input
        event.target.value = '';
    });

    // Escuchamos el Click cuando se haga click en un TODO de la lista
    // Nosotros debemos tomar el id que esta en el atributo 'data-id' porque es la forma que sabemos cual TODO se selecciono
    todoListUL.addEventListener('click', (event) => {
        // Con el metodo 'closest()' podemos buscar dentro de ese elemento HTML
        // el padre mas cercano que tenga el atributo '[data-id]'  
        // (Sin importar en que hijo del html hagamo click buscara en el PADRE mas cercano que tenga ese ID)
        const element = event.target.closest('[data-id]'); // Esto nos regresara todo el List Item
        // Con el .getAttribute() Solo obtenemos el ID y no todo el ListItem
        // Al TODO le mandamos ese ID
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos(); // Volvemos a renderizar para que sea vel Click
    });

    // Eliminar un TODO
    todoListUL.addEventListener('click', (event) => {
        // Que solo suceda cuando hacemos lcikc en el boton de la EQUIS que sale al lado del TODO
        // Este boton tiene la clase 'destroy'
        const isDestroyElement = event.target.className === 'destroy';
        // Tenemos que saber cual es el elemento a eliminar
        const element = event.target.closest('[data-id]');
        // Si el elementos No existe o NO se dio click en el boton Nos salimos del metodo
        if ( !element || !isDestroyElement ) return;
        // Solo llamamos al metodo y le madamos el ID del TODO
        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    clearCompletedButton.addEventListener( 'click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    // Recorremos cada uno del elementos HTML de los Filtros
    filtersLIs.forEach( element => {
        // cuando haga click en ese elemento Filtro
        element.addEventListener('click', (element) => {
            // Primero le quitamos la calse Selected (Para que solo un Filtro pueda estar seleccionado)
            filtersLIs.forEach( el => el.classList.remove('selected') );
            // LE agregamos la clase para indicarle que esta seleccionado
            element.target.classList.add('selected');

            // Falta saber a cual Filtro Le dimo click
            switch( element.target.text ){
                case 'Todos':
                    // De nuestro sotre importado usamos el Filter del objeto que ya lo contiene
                    todoStore.setFilter( Filters.All )
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                    break;
            }
            // Con esto afectamos que al dar click en un Filtro le afecte al TODO y le ocurra
            // lo que hace cada filtro
            displayTodos();

        });


    });


}