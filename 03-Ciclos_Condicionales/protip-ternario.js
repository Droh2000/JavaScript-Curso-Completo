// Funcion de flecha que nos diga el numero mayor
// PERO LO VAMOS A HACER CON EL OPERADOR TERNARIO
// cuando solo tenemos un return podemos poner todo en una linea
const elMayor = (a, b) => (a > b) ? a : b;
console.log( elMayor(20, 15) );

// Aqui como la condicion en el operador ternario del parametro de la funcion la vamos a trabajar como un booleanoi
// es muy comun ver si parentisis pero es mejor dejarolos
const tieneMembresia = ( miembro ) => (miembro) ? '2 Dólares' : '10 Dólares';
console.log( tieneMembresia(false) );

// El operador ternario tambien es util cuando queramos generar arreglos u objetos
// con una condicion
const amigo = false;
const amigosArr = [
    'Peter',
    'Tony',
    'Dr. Strange',
    // Podemos poner cualquier cosa que retorne algo
    // como aqui que es un ternario
    amigo ? 'Thor' : 'Loki',
    // EJEMPLO de una funcion anonima autoinvocada por eso los () al final
    // (()=> 'Nick Fury')()
    elMayor(10, 15)
];

console.log( amigosArr );


const nota = 82.5; // A+ A B+
// El valor de la variable dependera lo que regrese el operador ternario
//            Primer caso segun la variable nota
const grado = nota >= 95 ? 'A+' : // DEspues de los : es el caso contrario en caso que no se cumpla 
              nota >= 90 ? 'A'  :
              nota >= 85 ? 'B+' :
              nota >= 80 ? 'B'  :
              nota >= 75 ? 'C+' :
              nota >= 70 ? 'C'  : 'F'; // En caso que no se cumpla ninguna sera una 'F'

console.log({ nota, grado });



