
/**
 * 
 * @param {HTMLDivElement} element 
 */
 export const generatorFunctionsComponent = ( element ) => {
    // PAra usar la funcion generadora tenemos que invocarla
    // const myGenerator = myFirstGeneratorFunction();
    // console.log( myGenerator.next() ); -> Asi le decimos que nos de el siguiente valor (En este caso seria el primer valor)
    const genId = idGenerator();

    // Boton para generar los valores de la funcion generadora
    const button = document.createElement('button');
    button.innerText = 'Click me';
    element.append( button ); // Aqui solo lo creamos y agregamos al HTML
    // Funcion para el boton (Aqui nos estamos creadno un contandor usando solo una funcion generadora)
    const renderButton = () => {
        // desestructuramos el valor para obtenerlo
        const { value } = genId.next(); // Tomamos el valro generado de la funcion
        button.innerText = `Click ${ value }`;
    }
    // Le pasamos la funcion al boton que como no espera nigun argumeno asi que se la podemos mandar como referencia
    button.addEventListener('click', renderButton );
}

// Obtener valores secuencialmente 
function* idGenerator() {
    let currentId = 0;
    while(true) {
        // SE pone primero el ++ para incrementar y luego mostrar el valor que es 1
        // si fuera despues nos daria 0 como valor
        yield ++currentId;
    }
}



function* myFirstGeneratorFunction() {
    // De esta forma cada veez que encuentra un Yield se pausa la funcion
    // y cada vez que le solicitemos valores va a continuar con los demas
    yield 'Primer valor';
    yield 'Segundo valor';
    yield 'Tercer valor';
    yield 'Cuarto valor';
    
    return 'Ya no hay valores';
    yield 'Ya no pueden hacer nada';
}




