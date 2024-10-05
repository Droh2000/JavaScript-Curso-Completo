import { heroes } from '../data/heroes';
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const forAwaitComponent = async( element ) => {

    const id = '5d86371f2343e37870b91ef1'; // ID de ejemplo
    // Creamos un arreglo con todos los IDs 
    const heroIds = heroes.map( hero => hero.id );
    // PAsamos cada uno de los IDs que estan en el arreglo
    const heroPromises = getHeroesAsync( heroIds ); // llamamos la funcion que simula la peticion HTTP

    // En caso que no Exista el ID, lo podemos usar dentro del IF u otras estructuras
    /*if(await getHeroAsync(id)){
        element.innerHTML = "Si existe ese Heroe";
        return;
    }
    element.innerHTML = "Si existe ese Heroe";*/

    // Como esto nos regresa un arreglo del resultado (Es un arreglo de promesas)
    // Se esperar a que cada promesa se resuelva ->  esto es para cuando cada promesa la queramos regresar en tiempos diferentes
    for await( const hero of heroPromises ) {
        // Le metemos cada elemento del ID
        element.innerHTML += `${ hero.name } <br/> `
    }    

}

/**
 * 
 * @param {Array<String>} heroIds 
 * @returns {Array<Promise>}
 */
const getHeroesAsync = ( heroIds ) => {
    // ESta funcion nos regresa el arreglo de promesas
    const heroPromises = [];
    // Buscada cada ID dentro de GetHeroAsync y almacenamos las promesas
    heroIds.forEach( id => {
        heroPromises.push( getHeroAsync(id)  );
    });

    return heroPromises;
}

// Esta es una funcion en la cual se espera una segundo 
// para resolver la promesa y luego nos da lo encontrado por ID
// Es una forma de simular una peticion HTTP 
const getHeroAsync = async(id) => {

    await new Promise(( resolve ) => {
        setTimeout(() => resolve(), 1000)
    });

    return heroes.find( hero => hero.id === id );
}