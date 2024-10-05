
const heroes = ['Batman', 'Superman', 'Mujer Maravilla', 'Aquaman'];

console.warn('For tradicional');
// SE incialisa con let para que la i solo viva en ese SCOPE
for( let i = 0; i < heroes.length; i++ ) {
    console.log( heroes[i] );
}

// ESTE ES UN VERSION MEJORADA DEL DE ARRIBA para no escirbir tanto
console.warn('For in');
for( let i in heroes ) {
    console.log( heroes[i] );
}

// Es usado para obtener referencias a valores de objetos
// o arreglos de una manera mas sencilla
console.warn('For of');
// No se acostumbra nombrar como i la variable que va a iterar
for( let heroe of heroes ){
    // Aqui no nos importa la Pocicion (i) solo el valor que guarda
    console.log( heroe );
}



