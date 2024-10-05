// DECLARACION
// let o var se pone para indicar que la creamos por primera vez (Hay que ponerlo Siempre)
let a=10;
// Version antigua de declarar y NO Recomendada
var b=10;

const c=10;// Esta no podra volver a ser asignada

/*
POLYFILL

Es un codigo que provee el funcionamiento de una nueva 
caracteristica de Javascript (ES6) en verciones viejas
como por ejemplo (ES5)

*/

// clg + tab (Crear rapido)
console.log(a);

// Forma rapida
let d=10,
    e=12,
    f=16;

// El problema de VAR (Por defecto lo coloca en el objeto global window)
var nombre = 'Nada';
// Tambien podemos replazar propiedades ya defenidas de window
// var nomPropiedad = valor;

// Con var ocurre el siguiente problema
console.log(minombre);
// Aqui podria ir mucho otro codigo
var minombre = 'ALgo xd';
// Lo aneriror no sale undefined (Cualquie variable no inicia tiene este valor)
// JS lee todo el archivo JS de golpe de arriba a abajo
// Con LET ya nos indica que hay que inicializar primiero antes de usar la vairiable