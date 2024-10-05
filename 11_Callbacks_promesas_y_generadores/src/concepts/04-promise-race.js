
/**
 * 
 * @param {HTMLDivElement} element 
 */
 export const promiseRaceComponent = ( element ) => {

    element.innerHTML = 'Loading...';// Mostrara primero este mensaje hasta que se resuelva la promesa
    // Aqui solo mostramos el valor en el HTML
    const renderValue = ( value ) => {
        element.innerHTML = value;
    }
    // Con el Promise podemos acceder a varios contructores
    // Con el Race le mandamos el arreglo de las promesas
    Promise.race([
        // No importa el orden, ni cuantas mandemos a llamar
        // Lo importante es que ponemos a competir todas estas promesas
        slowPromise(),
        mediumPromise(),
        mediumPromise(),
        fastPromise(),
        mediumPromise(),
        slowPromise(),
        // El resultado solo sera de la primera en resolverse
    ]).then( renderValue );
    
}


// Definimos 3 promesas dentro de funciones
// Asi "() =>" le decimos que es una funcion que nos regresa un promesa
const slowPromise = () => new Promise( resolve => {
    setTimeout(() => {
       // Emitimos el valor si todo sale ok el siguiente mensaje 
       resolve('Slow Promise') ;
    }, 2000 ); // Para ejecutar tardara 2 segundos 
});

const mediumPromise = () => new Promise( resolve => {
    setTimeout(() => {
       resolve('Medium Promise') ;
    }, 1500 );
});

const fastPromise = () => new Promise( resolve => {
    setTimeout(() => {
       resolve('Fast Promise') ;
    }, 1000 );
});


