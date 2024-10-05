import { heroes } from '../data/heroes';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const generatorsAsyncComponent = async( element ) => {
    // Creamos el gnerador de los datos
    const heroGenerator = getHeroGenerator();
    let isFinished = false;

    do {
        // Tomamos los valores del generador y solo lo llamamos una vez
        // por eso no se puso la condicion comentada porque al llamar otra vez el next() nos saltariamos datos
        const { value, done } = await heroGenerator.next();
        isFinished = done;
        // Esto es para no mostrar el Undefined al terminar todos los registros del JSON
        if ( isFinished ) break;

        element.innerHTML = value;

    } while( !isFinished )
    // Esto de abajo seria una condicion para el bucle donde mandamos a llamar al siguiente valor
    // y con done es para saber si ya se obtuvo el valor nos salimos usando la negacion
    // !(await heroGenerator.next()).done)

}

// Aqui tomamos los datos del JSON pero los vamos a emitir secuencialmente
async function* getHeroGenerator() {
    
    for ( const hero of heroes ) {
        await sleep(); // Hacemos que demore un segundo entre cada una de las emiciones de su llamada
        yield hero.name;
    }// Cuando ya noa haya heroes se sale del bucle

    return 'no hay mas';
}

// Funcion que nos va a regresar una promesa
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(); // espera para su resolucion (Esto nos sirve para hacer un await)
        }, 500); // este es el tiempo que espera
    })
}


