
let a = 5;


if ( a >= 10 ) { // undefined, null, una asignación (Otras cosas que podemos enviar aprte de los booleanos)
    console.log('A es mayor o igual a 10');
} else {
    console.log('A es menor a 10');
}


// console.log('Fin de programa');

const hoy = new Date(); // {} (Creamos nuevos objetos con new)
let dia = hoy.getDay(); // 0: Domingo, 1: lunes, 2: martes.....

console.log({ dia });

/*
    == : Es para igualar pero NO IMPORTA EL TIPO DE DATO (1 == '1' daria true)
    === : EL TIPO DE DATO SI IMPORTA (1 === '1'  daria false)
*/
if ( dia === 0 ) {
    console.log('Domingo');
} else if( dia === 1 ) {
    console.log('Lunes');
    
    // if ( dia === 1 ) {
    //     console.log('Lunes');
    // } else {
    //     console.log('No es lunes ni domingo');
    // }
} else if ( dia === 2 ){
    console.log('Martes');
} else {
    console.log('No es lunes, martes o domingo...');
}

/*
    Es mucho problema para estar verificando con cada if
    PEro hay varias alternativas
*/

// Sin usar If Else, o Switch, únicamente objetos
// Imprimir el dia de la semana
dia = 6; // 0:domingo, 1: lunes.... (Con este mandamas a llamar el objeto o un arrelgo)

// Con objeto
const diasLetras = {
    /*
        Aqui tambien podemos hacer procedimientos
        no solo hay que limitarse a los condicionales
    POR EJEMPLO con el domingo    
    */
    0: () => 'domingo - 0',
    1:'lunes',
    2:'martes',
    3:'miércoles',
    4:'jueves',
    5:'viernes',
    6:'sábado',
}

// Con Arreglo
const diasLetras2 = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado',];


// día de la semana
// Pusimos el || por si sele manda un dia que no este definido
console.log( diasLetras2[dia] || 'Dia no definido' );