import { heroes } from '../data/heroes'
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const asyncAwaitComponent = async( element ) => {
    // En este caso dependemos de los ID's para renderizarlos
    const id1 = '5d86371f2343e37870b91ef13';
    const id2 = '5d86371f25a058e5b1c8a65e';
    // Tenemos que manejar el error
    try {
        // Con el Await la variable es el objeto como resultado sin esto seria una promesa
        // Asi ejecutamos una despues de la otra (Nuestra funcion sera mas lenta)
        // Estas promesas no tienen relacion entre si y asi podemos llamar en caso de nesesitar el valor de otra promesa para ejecutar otra
        const hero1 = await findHero( id1 ); // Obtiene el resultado espera a mandarlo a este objeto
        const hero2 = await findHero( id2 ); // Cuando termina el de arriba toma ahora el resultado de esta
       // Tambien podemos desestructurar los valor con: const {name: name1} = ... -> Asi solo usamos name1 como el que almacena el valor     

        element.innerHTML = `${ hero1.name } / ${ hero2.name }`;
        
    } catch (error) { // Este sera el primer error que se dispare
        element.innerHTML = error;
    }


}

// Funcion asincrona como la del archivo anterior
const findHero = async( id ) => {
    const hero = heroes.find( hero => hero.id === id );
    if ( !hero )
        throw `Hero not found`;
    return hero;
}
