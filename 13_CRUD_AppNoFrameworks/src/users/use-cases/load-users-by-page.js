import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { User } from '../models/user';

/**
 * 
 * @param {Number} page 
 * @returns { Promise<User[]> }
 */
// Por defecto ponemos que la pagina va a ser la primera (Asi es como vamos a cargar los usuario basados en una pagina)
// para cambiar de pagina simplemente se vuelve a llamar esta funcion y se le cambia el valor de Page
export const loadUsersByPage = async( page = 1 ) => {
    // La url la podriamos poner de forma estatica entre comillas como lo hicimos con la aplicacion anteiror
    // Pero cuando nos cambiemos a produccion en el backend no va a estar corriendo en la misma url ni el puerto
    // Entonces todo la parte de HTTP://url:puerto deberia de ser una variable de entorno para configurarla
    // Esta variable la creamos en .env llamada VITE_BASE_URL y el "page" es el que se le pasa a la funcion
    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    const res = await fetch(url); // Hacemos la peticion y obtenemos la respuesta
    const data = await res.json();// obtenemos los datos en JSON

    // Uso del Mapper
    // Los datos que recibimos del backend "data" la tenemos que convertir al mapper que creamos que sera la instancia 
    // del usuario, la "data" es un arreglo entonces podmeos usar la funcion "map()" para convertir las pociciones del arreglo
    // en otra cosa, aqui dentro mandamos a llamar la funcion del mapper "localhostUserToModel"
    // data.map(userLike => localhostUserToModel(userLike)) -> Como solo es el mismo y unico argumento lo podemo simplificar mandando la funcion como referencia
    const users = data.map( localhostUserToModel );
    // Madamos ya los datos transformados
    return users;
}