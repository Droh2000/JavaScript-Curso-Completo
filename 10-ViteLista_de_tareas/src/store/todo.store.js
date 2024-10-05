// Importamos para crear las intancias de la clase
import { Todo } from '../todos/models/todo.model';

// USamos como porppieades del objeto para apuntal a Strings
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

// Para nuestro Store
// Queremos saber como va lucir el estado global de la aplicacion
// Nos sirver para saber cual es la informacion que queremos proporcionar de manera global a la aplicacion
const state = {
    // Arreglo con las intancias de TODO
    todos: [
        new Todo('Pieda del alma'),
        new Todo('Pieda del espacio'),
        new Todo('Pieda del tiempo'),
        new Todo('Pieda del poder'),
        new Todo('Pieda del realidad'),
    ],
    // Para saber cual es el Filter que queremos aplicarle segun las opciones disponibles del TODO
    filter: Filters.All,// No se puso directamente el String Aqui paea que no fuera muy volatil y tener las opciones centralizadas
}

// La idea de este metodo es que inicialiar si  ya tenemos datos en el Stored
// aqui lo llamaos para cargar la Data
const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

/*
    Esta idea del Store 
        como preguntarle cuales con los Todos y tenerlos para poder renderizarlos
        tambien el tipo de filtro para saber si estan Pendientes, Completados (Para saber cual es la opcion seleccionada)
    Lo interesante de desarrolllar el Todo de esta forma es que no esta amarrado a ningun ramework
    ni al HTML ya que lo podemos importar a cualquie framework y lo podemos usar

*/
// A la hora de volver a Cargar el stored, vamoa leer el 'LOCAL STORAGE'
// Que es para que se mantengan los cambios y no se pierdan al recagar la pagina
const loadStore = () => {
    //throw new Error('Not Implemented'); (Esto se pone cuando creamos un metodo pero todabia no lo codificamos)

    // Hay que verificar si existe el State porque podria ser que si es la primera vez regrese un NULL
    // Buscamos el Item con el Key=state
    if( !localStorage.getItem('state') ) return;
    // Si existe contenido entonces tenemos que regresar el String
    // Como estamos trabajando con CONSTANTES y le vamos a asignar variable vamos a hacer
    // una desestrcuturacion de ese objeto con los TODOS y  FILTERS con el JSON.PARSE lo convertimos del STRING A JSON para meterlo al HTML 
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    // Lo valores que recuperemos los mandamos a donde veben ir
    state.todos = todos;
    state.filter = filter;
}

// Para trabajarlo con el 'LOCAL STORAGE'
// Solo mandamos a llamar el API del navegadir
const saveStateToLocalStorage = () =>{
    // ESTO FUNCIONARA A NIVEL DE NUESTRA APLICACION Y NUESTRO HOST NO APLICARA PARA OTROS DOMINIOS ni otros PC
    // Si queremos guardar datos seria tomar la const state y meterla aqui
    // Como solo acepta STRING con el 'JSON.stringfy()' que es una funcion del objeto JSON que esta de manera global en nuestro navegador
    // convertira a String lo que sea que le mandemos
    localStorage.setItem('state', JSON.stringify(state) );

    // Este metodo se mandara a llamar en todos los lugares donde modificamoss el STATE
}

// Para saber que tipo de filtro es el qu quiere
const getTodos = ( filter = Filters.All ) => {
    // Vasados en los 3 tipos de filtros vamos a seleccionar los todos respectivamente
    switch( filter ) {
        case Filters.All:
            // Com ya es un return no hace flata el Brake
            // Como los objetos siempre se pasan por referencias
            // Con los ... podemos regresar un nuevo arreglo
            return [...state.todos];
        
        case Filters.Completed:
            // Los arreglos ya vienen con esta funcion '.filter()'
            // este tambien nos va a regresar un nuevo arreglo para evitar la referencia
            // Entre () pasamos la condicion en este caso si "todo.done es igual a true" nos regresa el todo
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            // Regresamos todo los que no sean true
            return state.todos.filter( todo => !todo.done );

        default:
            // Para cuando el usuario nos mande un Filter que no exista
            throw new Error(`Option ${ filter } is not valid.`);
    }
}

/**
 * Para insertar un nuevo TODO
 * @param {String} description 
 */
const addTodo = ( description ) => {
    // PAra crearlo podriamos recibir toda la instancia o solo la descripcion y crear aqui la instancia

    // Primero verificamos si el parametro que nos mandan tenga algun valor
    if ( !description ) throw new Error('Description is required');
    // Insertamos al TODO la descripcion que nos manda
    state.todos.push( new Todo(description) );

    saveStateToLocalStorage();
}

/**
 *  Para cambiar el parametro que por defecto esta en False a True o Vicebersa
 * @param {String} todoId
 */
const toggleTodo = ( todoId ) => {
    // Queremos regresar un nnuevo arreglo con el TODO que ya tenemos por su ID
    // con su valor DONE inverso (Todos los TODOS tienen un ID y un PArametro Done que por defecto esta en false)
    // Este metodo cambia el valor del Parametro Done

    // Como estamos trabajando con arreglo tenemos el metodo map()
    // que nos permite regresar un nuevo arreglo con lo elemntose que nosotros indiquemos
    // transformando los elementos que ya estan por defecto en el arreglo
    state.todos = state.todos.map( todo => {
        // el todo => es para cada iteracion de los elementos que tenemos en el areglo con los 'new Todo()'
        // Si el id que estamos iternado es exactmante igual al todo que recibimos com argumento
        if( todo.id === todoId ) {
            // Si estaba en True pasa a False o vicebersa
            todo.done = !todo.done;
        }
        // Regresamos la instancia del Todo
        return todo;
    });

    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    // Aqui solo tomamos nuestro 'state' y con el metodo de los arreglos 'filter()'
    // Como condicion regresamos todos los TODOS que no coincidan con el ID que nos pasen
    // y asi lo eliminamos del listado regresando todos los TODOS que nos estan marcados como terminados 
    state.todos = state.todos.filter( todo => todo.id !== todoId  );
    saveStateToLocalStorage();
}

// Eliminar todos los todos completados
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * Para saber cual es el filtro que la persona quiere cambiar
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

/*
    Metodo para saber cual es el filtro selccionado porque nosotros no queremos exponer
    la funcion state() ya que como todos lo objetos se pasan por referencias
    y al exponerlo cualquier persona puede editar los datos del Stored
*/
const getCurrentFilter = () => {
    return state.filter;
}

// Como a todas las funciones y objetos anteriores no les pusimos el export al inicio
// por defecto terminan siendo privados entonces para no estar uno por uno
// y hacerlo todo a la vez se creo esta funcion para exportar solo lo que queramos
export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}

/*
    La idea despues de tener ya todo codificado
    este es nuestro manejado de estados que se encarge de manipular
    todo el estaod global de la aplicacion y asi separamos
    este estado de nuesto HTML
*/
