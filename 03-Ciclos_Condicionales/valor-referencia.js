/*
 Cuando trabajamos con datos primitivos cualquier
 asignacion o cuando mandamos a una funcion por argumento
 lo estamos mandando por valor:
    - No estamos afectando el mismo lugar de memoria
    estamos pasando unicamente el valor
*/
let a=10;
let b=a;
a=30;
console.log({a,b});

// Vemos que si cabiamos el valor de ana este tambien afectara los valores que tenga juan
let juan = {nombre:'juan'};
let ana = juan;
ana.nombre = 'Ana';
// Esto pasa porque todos los objetos son pasados por REFERECIAS
console.log({juan,ana});

/*
    Primitivos: Se pasan por valor
    Onjetos: Se pasan por referencia
*/

/*
    Aqui estamos pasando por referencia a peter (objeto) por la funcion
    entonces a cualquie modificacion que se le haga al argumento
    de la funcion va a ser afectoado si lo retornamos
*/
const cambiarNombre = (persona) => {
    persona.nombre = 'Tony';
    return persona;
}

let peter = {nombre:'Peter'};
let tony = cambiarNombre(peter);

console.log({peter,tony});

                // FORMA DE SOLUCIONAR ESTE PROBLEMA
// la mejor seria
// Cuando queramos crear una copia de un objeto
juan = {nombre:'juan'};
/*
Si lo ponemos solo entre {}
   Ana ahora es un objeto que tiene adentro objeto
   que tienen una propiedad llamada juan

   ESO NO ES LO QUE QUEREMOS ENTONCES   

   por eso le ponemos esos '...' para separar todas las propiedades y los valores
   se un objeto que es este operador SPRED
   Con esto tenemos que ANA es ana y juan mantiene su valor juan

   (ESTE ARGUMENTO '...':
    - Cuando lo ponemos en los parametros de una funcion
      Se llama REST que es para unir todos los argumento en una variable y lo convierta a un arreglo
    - En cualquier otra parte afuera entonces se llama SPREAD
   )
*/
ana = {...juan};
ana.nombre = 'Ana';

console.log({juan,ana});

/*
    Resolver el problema para el caso de las funciones

    Se pone entre {} el parametro y se usa el operador SPREAD
*/
const cambiarNombre2 = ({...persona}) => {
    persona.nombre = 'Tony';
    return persona;
}

peter = {nombre:'Peter'};
tony = cambiarNombre(peter);

console.log({peter,tony});

// Para el caso de los ARREGLOS
const frutas = ['manzana','pera','uva'];
const otrasFrutas = frutas;

otrasFrutas.push('MAngo');
// asi tienen la misma cnatidad de valores y si modificarmos una tambien se modificaria el otro arreglo
console.table({frutas,otrasFrutas});

/** SOLUCION **/
const frutas2 = ['manzana','pera','uva'];
// Asi creamos un nuevo arreglo separado de la copia
const otrasFrutas2 = [...frutas2];

// OTRA FORMA
/** Si no mandamos nigun argumento esto nos manda un nuevo arreglo rompiendo la relacion **/
const otrasFrutas3 = frutas2.slice();

otrasFrutas2.push('MAngo');
console.table({frutas2,otrasFrutas2});

/*
    Forma de medir el tiempo de ejecucion de una linea para comparar
*/

console.time('slice');
const otrasFrutas4 = frutas2.slice();
console.timeEnd('slice');

console.time('spread');
const otrasFrutas5 = [...frutas2];
console.timeEnd('spread');