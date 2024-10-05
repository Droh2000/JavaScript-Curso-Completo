/*
    Debilmente tipado: No hay que definir el tipo de dato al crear una vraible

    Primitivos: Es una informacion que no es un objeto y son inmutables
        Booleanos
        null: Sin valor en lo absoluto
        Undefined: Una variable declarada que aun no se le asigna valor
        Numeros (Es lo mismo int que float)
        Strings 
        Symbol: Es un valor unico que no es igual a ningun otro valor  

*/

let nombre = 'Juan Perez';
console.log(nombre);

nombre = 'Nose Nada';
console.log(nombre);

nombre = 'Jose';
nombre = 'Perez';

// Sacar el tipo de dato
console.log(typeof nombre);

nombre = 12345;
console.log(typeof nombre);

let esgay = true, noes=false;

let edad = 15;
console.log(typeof edad);
// Si es decimal es del mismo tipo
edad = 33.025594;
console.log(typeof edad);

let variable;
console.log(typeof variable);// Sale undefined

let otra = null;
console.log(typeof otra);// Nos sale object (Todo en js son objetos exceptuando los primitvos)

// Los symbol es para identificar propiedades de maenra unica
// crear identificadores unicos
let symbol1 = Symbol('a');
let symbol2 = Symbol('a');

console.log(typeof symbol1);
// Esto nos dara flase
console.log(symbol1 === symbol2);

// Ejemplo para crear nombre de variables
let _objeto$123 = 123;
let precio99_99 = 99.99;

let jugadorAlto = 'Fern';