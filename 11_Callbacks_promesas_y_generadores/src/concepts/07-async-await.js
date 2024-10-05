
/**
 * 
 * @param {HTMLDivElement} element 
 */
 export const asyncAwait2Component = async( element ) => {
    // En este caso queremos es tomar todos los valores de las promesas e imprimierlos en pantalla
    console.time('Start'); // Esto es para comprobar el tiempo

    // Este seria de la forma normal (Como niguna depende de la otra, no tiene caso ejecutarlas en secuencia)
    // const value1 = await slowPromise();
    // const value2 = await mediumPromise();
    // const value3 = await fastPromise();
    
    // Ejecutamos todas las promesas de manera simultaneaas
    // Desestructuramos para obtener los valores de cada promesa
    const [value1, value2, value3 ] = await Promise.all([
        slowPromise(),
        mediumPromise(),
        fastPromise(),
    ]);

    // Imprimimos los valores obtenidos
    element.innerHTML = `
        value1: ${ value1 } <br/>
        value2: ${ value2 } <br/>
        value3: ${ value3 } <br/>
    `;

    console.timeEnd('Start'); // ASi finalizamos la medicion del tiempo con el mismo nombre


}


// Tenemos varias promesas
const slowPromise = () => new Promise( resolve => {
    setTimeout(() => {
       resolve('Slow Promise') ;
    }, 2000 );
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
