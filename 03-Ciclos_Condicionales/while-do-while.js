

const carros = ['Ford','Mazda','Honda','Toyota'];

let i = 0;

/*

while( i < carros.length ) {
    console.log( carros[i] );
    // i = i + 1;
    i++;
}

*/
console.warn('While')

// ESTAS SON CONSIDERADAS CONDICIONES false que podrian hacer que un bucle unca se ejecute
// undefined
// null
// false
// Asi es como en la condicion solo podemos ponerle con la pocicion [i]
// ya que una pocicion que no existe nos regresa un undefined
while( carros[i] ) {
    if ( i === 1 ){
        // break; (Corta el ciclo)
        i++;
        continue; //(Corta el flujo y sigue con la siguiente iteracion)
    }
    
    console.log( carros[i] );
    i++;
}


console.warn('Do While');
let j = 10;// Como esta pocicion no existe entrara de todos modoes e imprimira undefined

do {
    console.log( carros[j]);
    j++;
} while( carros[j] );

