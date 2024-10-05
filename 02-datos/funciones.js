
// Funcioens basica
function saludar(){
    console.log('Hola mundo');
}

const saludar2 = function saludar(){
    console.log('Hola mundo');
} // Esto seria una funcion anonima

// mandar a llamarla
saludar();
saludar2();

// Argumnetos
function saludar3(nombre){
    console.log(arguments);
    console.log('Hola '+nombre); // Si no le mandamos el valor nos sale Undefined
}

// Si le madnamos argumentos que no esten declarado No dara error
saludar3('Jose',48,true,'Africa');
/*
    Esto es porque estas funciones tradicionales (No las flechas)
    tienen un parametro interno llamado arguments (Este almacena todos los elementos que le envuemos a la funcion)

*/


// Funciones Flecha
const salfle = () => {
    console.log('Hola flecha');
}
// Lo parentecis son opcionales y los podemos quitar
const salfle2 = (nom) => {
    console.log('Hola flecha '+nom);
}

/********************************  RETORNAR UN valor  *****************************/

// Todas las funciones retornaran undefined aunque no tnegan un return explicito
function sal(nombre){
    return nombre;
}
console.log(sal('Fernando'));

// Podemos retornar cualquier cosa
/*function sal(nombre){
    return 1,2,3; // Esto no hay que hacerlo
}*/
// Retornar mas de un valor
function sal(nombre){
    return [1,2,3];
}
// Con funcion de flecha
const sumar2 = (a,b) => {
    return a+b;
}
console.log(sumar2(1,2));

// LA funcion de flecha se puede resumir en
// Esto solo funcionan cuando tenemos una linsa
const sumar3 = (a,b) => a+b; // Para cuando solo tenemos el return
console.log(sumar3(1,2));

// Ejemplo de funcion normal a funcion flecha
function getAletorio(){
    return Math.random();
}
const getAletorio2 = _ => Math.random();
console.log(getAletorio2());



