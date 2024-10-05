
// Funciones como ejemplo
const regresaTrue = () => {
    console.log('Regresa true');
    return true;
}

const regresaFalse = () => {
    console.log('Regresa false');
    return false;
}


/*
    Trabajar con los operadores booleanod

    Convertir al valor contrario
*/
console.warn('Not o la negación');
console.log( true ); // true
console.log( !true ); // false
console.log( !false ); // true

console.log( !regresaFalse() ); // true


console.warn('And'); // true si todos los valores son verdaderos
console.log( true && true ); // true
console.log( true && !false ); // true

console.log('=========');
/*
    Con esta comprovacion vemos que solo se ejecuto el regresa flaso
    Como la primera instriuccion ya regresa falso JS ya no evaluara lo demoas
*/
console.log(  regresaFalse() && regresaTrue() ); // false
// Como la primera dio TRUE si ejecuta la otra parte aunquie dio flase
console.log(  regresaTrue() && regresaFalse() ); // false

console.log('==== && =====');
regresaFalse() && regresaTrue();

console.log( '4 condiciones ', true && true && true && false ); // false


console.warn('OR'); // true
console.log( true || false );
console.log( false || false );

/*
    Este solo ejecuto el de regresa TRUE
    Porque ya con uno que regrese verdad no hace flata evaluar lo demas
    porque con el OR solo importa uno
*/
console.log( regresaTrue() || regresaFalse() );
console.log( '4 condiciones ', true || true || true || false ); // true



console.warn('Asignaciones');

const soyUndefined = undefined;
const soyNull = null;
const soyFalso = false;

// Aqui esta signando el ultimo valor con el and lo toma como ese debe ser el valor que le asigne a la variable
// Lo hace asi porque los demas anteriores son valores NO nulos o undefined
const a1 = true && 'Hola Mundo' && 150; // ?
// Como es false no va a evaluar lod emas
const a11 = false && 'Hola Mundo' && 150;

//La condicion es que todo debe dar vrdadero para que se le asigne el ultimo valor
const a22 = 'Hola' && 'Mundo' && soyFalso;// Da false
// Verificamos que arriab no dio false porque sea el ultimo sino porque no cumple la condicion que todos sean TRUE
const a2 = 'Hola' && 'Mundo' && soyFalso && true;


const a3 = soyFalso || 'Ya no soy falso'; // Toma el ultimo
// Por defecto toma el 'Ya no soy falso de nuevo' porque como ese ya es un valor defindo
// No importa lo que siga despues
const a4 = soyFalso || soyUndefined || soyNull || 'Ya no soy falso de nuevo' || true;

// Toma true
const a5 = soyFalso || soyUndefined || regresaTrue() || 'Ya no soy falso de nuevo' || true;

console.log({a1, a2, a3, a4, a5 });

// Logica boleana
if ( regresaFalse() && regresaTrue() && (true || false || true) ) {
    console.log('Hacer algo');
} else {
    console.log('Hacer otra cosa');
}




