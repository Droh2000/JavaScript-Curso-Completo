import { User } from '../models/user';
// Paso inverso para mandarle al backend la informacion como lo esta esperando
// asi para no mandarle los campos como nosotros especificamos los nombres de los campos
// porque el backend requiere los campos como este los tiene
/**
 * 
 * @param {User} user 
 */
export const userModelToLocalhost = ( user ) => {// La instancia de la clase la convertimos a como lo espera el backend
    // Desestructuramos todas las propiedades que ocupamos
    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,
    } = user;
    // Regresamos un objeto exactamente igual como lo espeta el Backend
    // igualando con : los que cambian de nombre
    return {
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName,
    }

}