import { heroes } from '../data/heroes';

/**
 * 
 * @param {HTMLDivElement} element 
 */
// Un callback es una funcion que recibe un argumento que es una funcion que invocamos dentro de nuestra funcion
export const callbacksComponent = ( element ) => {
    // Estos son ID's del arreglo JSON como ejemplo
    const id1 = '5d86371fd55e2e2a30fe1ccb1';
    const id2 = '5d86371fd55e2e2a30fe1ccb2';
    // Uso de la funcion de abajo pasandole otra funcion como argumento que es el callback
    // En la definicion del callback le especificamos como parametros
    // los argumento que son el error y el heroe
    findHero( id1, (error, hero1) => {
        // Tomamos el elemento HTML 'element' y manejamos una condicion en caso que el ID no exista
        // element.innerHTML = hero?.name || 'No hay heroe';
        if ( error ) {
            // Renderizamos el error
            element.innerHTML = error;
            return;
        }
        // Ahora queremos mostrar el otro ID's entonces volvemos a llamar la funcion
        findHero( id2, (error, hero2) => {
            // No importa que el argumento "error" se llame igual que el de arriba porque como definimos abajo
            // otro entonces este argumento apunta a ese, es decir por el Scope no se remplaza
            if ( error ) {
                element.innerHTML = error;
                return;
            }
            // Aqui mostramos los dos ID's que como estamos en el mismo Scope tenemos acceso a los dos
            element.innerHTML = `${ hero1.name } / ${ hero2.name }`;
        });
        // Aqui estamos usando el Callback Hell y debemos evitarlo
    });
}

// Creamos esta funcion para buscar los datos del JSON a partir del ID
// En estos datos de arriba especificamos la documentacion de los tipos de datos
// Para el caso que le pasemo un dato desconocido
// El primer argumento es el error de tipo String o Null
/**
 * 
 * @param {String} id 
 * @param { ( error: String|Null, hero: Object)=> void } callback 
 */
const findHero = ( id, callback ) => {
    // Tomamos el JSON que esta almacenado en un arreglo
    const hero = heroes.find( hero => hero.id === id );
    // Llamamos la funcion "Callback"
    if ( !hero ) {
        // El sentido de manejar asi el error es para saber porque ocurre el error
        callback(`Hero with id ${ id } not found.`);
        return; // undefined; para terminar la ejecucion y salirnos de la funcion
    }
    // El primero argumento que es el error es null en caso de todo OK
    callback( null, hero );
}

