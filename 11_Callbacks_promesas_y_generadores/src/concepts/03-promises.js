import { heroes } from '../data/heroes';
// Las promesas es un pacto entre dos partes en el cual una se compromete a un trabajo y la otra esta esperando la promesa
// pero puede que la promesa se rompa y en ese caso se tiene que hacer una accion
/**
 * 
 * @param {HTMLDivElement} element 
 */
 export const promiseComponent = ( element ) => {
    // Trabajar con la Promesa
    const renderHero = ( hero ) =>{
        element.innerHTML = hero.name; // Aqui solo estamos renderizando el contenido
    }
    // Promise Hell
    // En caso que quereamos renderizar dos ID's al mismo tiempo sino tiene que fallar todo
    const renderTwoHeroes = (hero1, hero2) => {
        element.innerHTML = `
            <h3>${ hero1.name }</h3>
            <h3>${ hero2.name }</h3>
        `;
    }
    // Esto es para manejar el error
    const renderError = ( error ) => {
        element.innerHTML = `
            <h1>Error:</h1>
            <h3>${ error }</h3>
        `
    }
    // Tomamos unons ID's de ejemplo
    const id1 = '5d86371f25a058e5b1c8a65e';
    const id2 = '5d86371f97c29d020f1e1f6d';
    // Asi podemos ejecutar todas las funciones o promesas que definamos en un arreglo de promeasas
    // y le pasamos la promesas que queramos ejecutar de menara simultanea (Porque en este caso no dependemos del valor que nos regrese la primera promesa)
    Promise.all([
        findHero(id1), // La llamamos como una funcion
        findHero(id2),
    ])
    // Para obtener lo que nos regresa tenemos:
    // A Then le especificamos el nombre que sea como argumento y le mandamos la funcion que nos renderiza el contenido
    // Si son la misma cantidad de argumentos en los dos lados entonces se puede especificar solo .then(renderTwoHeroes)

    // En este caso por el Promise.all tegresa como un arreglo los valores resueltos y con que una de error se ejecuta el Catch 
    .then( ([hero1, hero2]) => renderTwoHeroes( hero1, hero2) ) // Si todo sale bien
    // Aqui solo mandamos como referencia la funcion
    .catch( renderError ); // En caso que salga algo mal
    
    // Formas para trabajar con el Promse Hell
    //! Forma 2
    // let hero1;
    // findHero(id1)
    //     .then( hero => {
    //         hero1 = hero;
    //          Si hacemos un Return y regresamos otra promesa lo que hacemos es que esta promesa
    //          regresa otra promesa y nos conectamos con promesas en cadena obteniendo el resultado en .then
    //         return findHero(id2);
    //     }).then( hero2 => {
        //  Por eso creamos la variable "hero1" para obtener acceso al valor por el Scope
    //         renderTwoHeroes( hero1, hero2 );
    //     })
    //          Asi podemos manejar solo un Catch
    //     .catch( renderError );

    //! Forma 1
    // Estas promesas son independientes entre si, solo las estamos llamando en cadena
    // pero podriamos llamar una obtener el resultado y luego llamar otra promesa (Esto en el caso de no depender del resultado de la primera promesa)
    // findHero( id1 )
    //     .then( (hero1) => {
  
    //         findHero( id2 )
    //             .then( hero2 => {
    //                 renderTwoHeroes(hero1, hero2)
    //             })
    //             .catch( renderError );
    //     })
    //     .catch( renderError );
    
}

// Creamos una funcion como la del Callback
// Supongamos que para saber esta informacion se tiene que llegar desde un servidro de manera externa a nuestra PC
// y queremos evitar usar el Callback Hell
/**
 * 
 * @param {String} id 
 * @returns {Promise}
 */
const findHero = ( id ) => {
    // Las promesas es un objeto especial que tiene JS
    // Dentro de la promesa se le pasa un Callback y esto es lo que vamos a ejecutar (Es el cuerpo de nuestra promesa)
    // Tiene dos argumentos que son:
    // "Resolve" -> Es una funcion que va a tener el valor producto (Lo que queremos encontrar)
    // "Reject" -> Es para el caso de nos resolver la promesa exitosamente
    return new Promise(( resolve, reject ) => {
        // Encontramos el elemento por su Id's
        const hero = heroes.find( hero => hero.id === id );
        // Si lo encontramos llamamos el Resolve
        if ( hero ) {
            resolve( hero ); // Solo podemos llamar uno
            return; // PAra temrinar la ejecucion de la funcion
        }
        // Si falla la promesa
        // Le especificamos la razon 
        reject(`Hero with id ${ id } not found`);
    });
}
