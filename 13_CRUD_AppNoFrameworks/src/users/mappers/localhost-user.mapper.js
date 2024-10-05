import { User } from "../models/user"

/*
    La funcion Mapper que recibe un argumento que contenga las propiedades que recibimos del API
    y se encarge de regresarnos una instancia de tipo de la clase User

    El archivo empieza llamandose Localhost porque podemos crear diferentes mappers por fuente de datos 
    (Produccion, desarrollo, o diferentes hostings)

    Like<User> -> Es para indicar que es algo que lusca como un usuario
*/
/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
// Aqui vamos a recibir el usuario como venga
export const localhostUserToModel = ( localhostUser ) => {
    // Desestructuramos del usario que recibimos como parametros y extraemos cada una de las propieades
    // que vienen del objeto (Como venga del backend con el mismo nombre)
    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser;
    // Regresamos una instancia del modelo de usuairo que creamos en la clase
    // El objeto tiene cada una de las propiedaes como las esperos, igualando en las que cambia de nombre
    // En las que tiene el mismo nombre no se pone Nombre:Nombre porque se puede omitir y solo especificar una vez
    return new User({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });
}