import { heroes } from '../data/heroes'

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const asyncComponent = ( element ) => {
    // Id de ejemplo que tomamos
    const id1 = '5d86371fd55e2e2a30fe1ccb22';
    console.log('Inicio de componente');
    // Llamamos a la funcion
    findHero( id1 )
        .then( name => element.innerHTML = name ) // Mostramos el elemento 
        .catch( error => element.innerHTML = error )

    console.log('Fin del componente');
}

// Funcion Asincrona
// Estas funciones siempre resuelven correctamente (Siempre tendremos un valor)
/**
 * 
 * @param {String} id 
 * @returns {Promise<String>}
 */
const findHero = async( id ) => {
    // Encontramos el ID     
    const hero = heroes.find( hero => hero.id === id );
    // En caso de no encontrar el ID's (Manejamos el error)
    if ( !hero )
        throw `Hero with id ${ id } not found`; // Asi es como llamamos al Catch

    return hero.name; // Solo queremos el nombre

}

