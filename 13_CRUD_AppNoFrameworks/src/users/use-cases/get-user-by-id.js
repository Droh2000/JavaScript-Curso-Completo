import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { User } from '../models/user';

// Obtener un usuario por el ID
/**
 * 
 * @param {String|Number} id 
 * @returns { Promise<User> }
 */
export const getUserById = async( id ) => {
    // URL con el uso de la variable de entorno y le mandamos el Id a buscar
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    const res = await fetch(url);
    const data = await res.json(); // Regresamos los datos en JSON
    // Le mandamos los datos
    const user = localhostUserToModel( data );

    return user;
}
