/*
    JS tiene dos tipos de datos Literales
    - Primitivos
    - Objetos

    Los Objetos literales son los que tienen {CLave:Valor}
*/

// Creacion de objetos (Con pares de valores)
// Puede almacenar lo que queramos
let persona = {
    nombre: 'Juanito banana',
    poder: 'cagar de pie',
    vivo: false,
    edad: 40,
    coords:{
        lat: 34.034,
        lng: -118.70
    },
    horas: ['No','Se','Nada','Xd'],
    direccion: {
        zip: '140254, 058481',
        ubicacion: 'Afganistan'
    },
    // Si queremos poner espacios
    'ultima cosa': 'Ver nopor',
};

// Cuando se imprime se muestra en orden alfabetico
console.log(persona);

// acceder al valor
console.log(persona.nombre);
console.log('Nombre',persona['nombre']);
console.log('Edad',persona.edad);

// Valores anidados
console.log('Coords',persona.coords);
console.log('Lat',persona.coords.lat);

console.log('horas',persona.horas[2]);// No es recomendable acceder con los numeros asi
console.log('Num horas',persona.horas.length);
console.log('Ultima Hora',persona.horas[persona.horas.length-1]);

// Trabajar de forma dinamica con nuestros objetos
const x='vivo';
console.log('Vivo',persona[x]);

console.log('Ultima cosa',persona['ultima cosa']);

/***************** MAS DETALLES ******************/

// Borrar una propiedad
delete persona.edad;
console.log(persona);

// Convertir a varios Arreglo con pares clave:valor
// Cada pareja va a ser un arreglo 
const entrePares = Object.entries(persona);
console.log(entrePares);

// Crear una nueva propiedad
persona.nuevo = true;

// Para hacer MUTABLE un objeto
// Si creamos con Const
// persona = {} Esto es lo unico que no permite hacer pero los demas metodos si

// Para hacer un bloqueo de las propiedaes
// Ya no sera posible eliminar ni crear propiedades
Object.freeze(persona);
persona.otro = true; // No funcionara
console.log(persona);

// freeze solo conjela las asignaciones a las propiedades pero no a los valores que almacena
persona.direccion.ubicacion = 'Japon';
console.log(persona); // Si lo cambio
// Si queremos bloquearlo tendremos que hacer un freezer de todo esa rama

// Obtener un listado de todas las propiedades
// Nos regresa un Array
const props = Object.getOwnPropertyNames(persona);
const values = Object.values(persona);
console.log({props,values});
