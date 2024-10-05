import { loadUsersByPage } from "../use-cases/load-users-by-page";

/*
    Este es el punto inicial del Stored

    Es un modulo pero no queremo exportar el State porque no queremos que nadien afuera del State lo pueda
    manipular
*/
const state = {
    currentPage: 0,
    users: [],
}

// Para cargar la siguiente pagina
const loadNextPage = async() => {
    // Implementamos la funcion que carga los usuarios por pagina
    // La pagina que vamos a mandar a llamar es el currentPage mas 1 porque es 0
    /*
        Esto por defecto nos regresa los primeros 10 usuarios del backend
        
        Vamos a prepararnos para el cambio en el que el backend cambia el nombre de sus atributos
        y cuando pase, nuestra aplicacion tiene que ser los suficientemente flexible para que ese cambio
        no nos impacte, asi que en Models creamos "user.js"

        Este "loadUsersByPage" nos regresa los usuarios
    */
    const users = await loadUsersByPage( state.currentPage + 1 );
    // Si es 0 no haga nada porque como estamos cargando por pagina cuando se ejecute por primera vez
    // 0+1 sera la pagina 1 la que se carge, si no hay registros siginifica que o exite la pagina 1
    // Cuando se solicite una pagina que no exita nos regresara un arreglo vacio (Esto lo podemos comprobar en postman)
    if ( users.length === 0 ) return;

    // Asi solo vamos a actualizar la pagina si hay usuarios en la respuesta
    state.currentPage += 1;
    state.users = users;
}
// Cargar la pagina anterior
const loadPreviousPage = async() => {
    // Como no existe la pagina 0 y si ya estamos en la pagina 1 y se preciona el boton de retroceder entonces no hace nada
    if ( state.currentPage === 1 ) return;
    // Cargamos los registros y le pasamos la pagina menos 1
    const users = await loadUsersByPage( state.currentPage - 1 );
    
    state.users = users;// Cambiamos por los usuarios de esa pagina
    state.currentPage -= 1; // Actualizamos el valor del atage
}

// Para cuando la informacion del un usuario cambia
/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = (updatedUser) => {
    // Asegurarnos si se encontro o no un usuario
    let wasFound = false;
    // Con esto acutalizamos el objeto de usuario que esta en nuestro estado
    // Verificamos si encontramos un usuario cuyo ID se igual al usuario pasado como paremtro
    state.users = state.users.map( user => {
        if ( user.id === updatedUser.id ) {
            wasFound = true;
            return updatedUser;// Regresamos el usuario actualizado
        }
        return user;// Regresamos el usuario que ya estaba
    });

    // Podria pasar que no exista el usuario o que tengamos menos de 10 usuarios en state.users
    // Si tenemos menos de 10 usuario y cambio entonces queremos insetarlo
    if ( state.users.length < 10 && !wasFound ) {
        // De esta manera al tener menos de 10 usuarios en la pagina y guardamos o actualizamos
        // a un usuario y no esta en el condicional de arriba entonces lo insertamos
        state.users.push( updatedUser );
    }

}

// Recargar la pagina actual
// La idea de esta funcion es que al eliminar un registro no nos queden 9 elementos en la pagina a solo que queden 9 o menos en la base de datos
// Siempre queremos ver 10 elementos en la pagina, asi que volvemos a cargar la pagina 
const reloadPage = async() => {
    // Aqui queremos la pagina actual
    const users = await loadUsersByPage( state.currentPage );
    if ( users.length === 0 ) {// Si no hay usuarios
        // Si eliminamos todos los registros de una pagina
        await loadPreviousPage();// Cargamos la pagina anterior
        return;
    } 
    
    state.users = users;// Establecemos los usuarios
}

// Vamos a exportar todas nuestras funciones
export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    // Tambien vamos a querer que desde afuera del Stroed podamos tener acceso a cual es la pagina
    // actual y cuales son los usuarios
    /**
     * @returns {User[]}
     */
    // Los objetos se pasan siempre por referencia
    getUsers: () => [...state.users], // Este va a mandar a refernecia de nuestro objeto entonces lo ponemos entre llaves y usamos el operador ... (Spread) para esparsir cada uno 

    /**
     * @returns {Number}
     */
    // Este no se pasa por referencia porque los primitivos como el 0 se pasan por valor
    getCurrentPage: () => state.currentPage,
}