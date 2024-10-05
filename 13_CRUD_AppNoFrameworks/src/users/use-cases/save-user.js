import { User } from '../models/user'
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { localhostUserToModel } from '../mappers/localhost-user.mapper';
/*
    Para crear un usuario tenemos que tomar el objeto que luce como un usuario y preparalo para enviarlo a nuestro backend

    Tenemos que usar el Endpoint de POST y en el Body de la peticion tenemos que mandar el objeto que queremos guardar
    
    Creamos un nuevo caso de uso para la accion de guardar y aqui mismo vamos a actualizar

    Por la forman en que se nos envien la informacion determinaremos si quieren guardar o actualizar, esto porque al guardar
    un nuevo usuario no tenemos un ID pero si seleccionamos un registro de la tabla ya vendra con un ID

    El userLike es el objeto que vamos a recibir que seria para crear uno nuevo
*/
/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async( userLike ) => {
    // Creamos una nueva instancia porque como parametro de la funcion va a venir el objeto, este lo mandamos al contructor
    // que esta esperando un objeto y nos genera la instancia del usuario y asi ya tenemos acceso a todas las propiedades del mismo
    const user = new User( userLike );
    
    // Validacion para no mandar datos vacios
    if ( !user.firstName || !user.lastName ) 
        throw 'First & last name are required';

    // Tenemos que hacer otro Mapper 
    // Porque tenemos que transformar los datos a como los espera el Backend y no como los transformamos
    const userToSave = userModelToLocalhost( user );// Le mandamos la instancia del usuario
    
    // Debemos de rergesar una instancia de un usuario (Que es nuestro mapper)
    let userUpdated;
    // Si tenemos un ID
    if ( user.id ) {
        // Actualizamos
        userUpdated = await updateUser(userToSave);
    } else {
        // Creamos un nuevo usuario
        userUpdated = await createUser( userToSave );
    }
    // Retornamos el objeto ya convertido a una instancia dle usuario
    return localhostUserToModel( userUpdated );
    
}

// Funcion para Crear un Usuario (POST)
/**
 * @param {Like<User>} user
 */
const createUser = async( user ) => {// Recibimos el usuario que tenemos que guardar en el Backend
    // Definimos la URL usando la variable de entorno y le agregamos a la ruta la parte de los usuarios
    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    // Utilizamos el Fecth pasandole la URL pero tambien una configuracion Extra para que realize el POST
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),// Tiene que ir serializado como un String
        // Le decimos al backend que espere el contenido como si fuera un contenido JSON
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Si todo sale bien el backen nos regresa el usuario creado
    const newUser = await res.json();
    console.log({ newUser });

    return newUser;

}

// Para actualizar un Usuario
/**
 * @param {Like<User>} user
 */
 const updateUser = async( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;
    // PUT le decimos que queremos remplazar todo el objeto
    // PATCH solo actualizamos lo que le enviamos pero eso depende de como este contruido el backend
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    console.log({ updatedUser });

    return updatedUser;

}
