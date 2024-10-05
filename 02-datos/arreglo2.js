// METODOs (Funciones que vienen internas) y Propiedades (Son como una variables dentro del arreglo)

let arr = ['Juan','Jose','Jorge'];
console.log('Longitud',arr.length);

let primero = arr[0];
let ultimo = arr[arr.length-1];

console.log({primero,ultimo});

// Recorrer todos los elementos
arr.forEach(
    // Este ejecuta una instruccion por cada item
    // Le madnamos esto como parametro
    (item,index,arr) => {
        console.log({item,index,arr});
    }
);

// Colocar un elemento al final
let nuevaLong = arr.push('Jaziel');// esto solo se hizo para ver el tamano
console.log(nuevaLong,arr);

// Insertar al inicio
arr.unshift('Joder');

// Eliminar
let element = arr.pop(); // Este tambien nos regresa el elemento eliminado

// Eliminar con una pocicion en especifico
let pos = 1;
// Le mandamos la pocicon de inicio donde empezara a eliminar
// Cuantos elemento queremos eliminar
// Regresa un nuevo arreglo
arr.splice(pos,2);// Empieza en 1 y borra 2 elementos apartir de ahi

console.log(arr);
let borrados = arr.splice(pos,2);
console.log({borrados,arr});

// Saber en que lugar se encuentra un item
let nombreIndex = arr.indexOf('Juan')
console.log({nombreIndex});// Si no encuentra el elemento nos regresara -1
