/**
 * Días de semana abrimos a las 11, 
 * pero los fines de semana abrimos a las 9
 */

// Entra a un sitio web, para consultar si está abierto hoy....
const dia = 1; // 0: domingo... 1:Lunes.... Este es el dia actual
const horaActual = 10;


let horaApertura;
let mensaje; // Está abierto, Está cerrado, hoy abrimos a las XX

/*
    Con el operador ternario resumimos
//if ( dia === 0 || dia === 6 ) {

// Segunda forma de resumir sin usar operador ternario
// Ponemos entre un arreglo los dias de la semana
// .includes() es un metodo que tienen los arreglos para preguntar si algo existe dentro de ese arreglo
if ( [0,6].includes( dia ) ) { 
     console.log('Fin de semana');
     horaApertura = 9;
} else {
     console.log('Día de semana');
     horaApertura = 11;
}*/

// OPERADOR TERNARIO [Condicion ? SiSeCumple: NoSeCumple]
// El resultado se lo asignamos a la variable
// Los () no son obligatiorios pero es buena practica
// Despues del ? es en caso de que si se cumpla la condicion
// Despues de : es cuando no se cumpla
horaApertura = ( [0,6].includes( dia ) ) ? 9 : 11;


/*if ( horaActual >= horaApertura ) {
    mensaje = 'Está abierto';
} else {
    // La mejor forma de concatenar NO es ''+variable (Tiende a errores)
    // Es con estas comillas y entre ${variables} 
    mensaje = `Está cerrado, hoy abrimos a las ${ horaApertura }`;
}

Convertir a ternario
*/

mensaje = ( horaActual >= horaApertura ) ? 'Está abierto' : `Está cerrado, hoy abrimos a las ${ horaApertura }`;


console.log({ horaApertura, mensaje });