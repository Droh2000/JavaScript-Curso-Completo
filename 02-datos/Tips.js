// Retorno de funciones
// Forma Antigua ************************************
function crearPersona(nombre,apellido){
    return {
        nombre: nombre,
        apellido: apellido
    }
}
// TIP: ************************
/*
    Cuando queremos retornar un objeto y el nombre
    de la pripiedad es el mismo que el nombre del paremtros del metodo
    no hace falta ponerlo 2 veses
*/
function crearPersona(nombre,apellido){
    return {nombre, apellido}
}
const persona = crearPersona('Diego','Ortega');
console.log(persona);

/*
    Si lo queremos en una funcion flecha ahorrandonos
    las llaves depemos meterlos entre parentesis porque si no no
    funcionara y retornara undefined
*/
const persona2 = (nombre,apellido) => ({nombre,apellido});


// Impresion de los argumentos
function imprimeArgumentos(){
    console.log(arguments);
}
imprimeArgumentos(1,'lol',true,'Nada');

// En una funcion de flecha dara error
// TIP: ************************
/*
    Si notors nececitamos trabajar con los argumentos en una fiuncion flecha
    al declarar '...NombreCualquiera' que hace referencia que a todos
    los argumentos enviados nos creara un arreglo con cada uno
    (ESTO SE LLAMA EL PARAMETRO REST)
    Consideraciones:
        - Despues de ponerlo no puede vnier ningun otro argumento
        - Si nececitamos extraer una variable antes de Rest
            Por ejemplo la 'edad' este no sera tomado en cuenta con REST pero sera un argumento independiente
*/
const imprimeArgumentos2 = (edad,...args)=>{
    console.log({edad,arg});
}
    
imprimeArgumentos(10,'lol',true,'Nada');

// Si queremos almacenar en una variable solo los argumentos
const imprimeArgumentos3 = (edad,...args)=>{
   // console.log({edad,arg});
   return args;
}
    
const argst = imprimeArgumentos(10,'lol',true,'Nada');
/*
const edad = argst[0];
const algo = argst[1];
const .... = .....[n];

Si queremos almacenar sus valores asi es mucho trabajo
*/
// TIP: ************************
/*
    Como nos retorna un arreglo
    declaramos las [] al inicio y darldes directamente un nombre
*/
// El 10 esta alamcenado en 'edad' por eso al extraer los argumento no tomar en cuneta
const [casado,vivo,saludo] = imprimeArgumentos(10,'lol',true,'Nada');
console.log({casado,vivo,saludo});

// Lo mismo si nos retorna un objeto
// Si solo nos interesa una determinada propiedad
// Le ponemos el mismo nombre que el nombre del parametro del metodo (O que el valor del parametro dle objeto)
const {apellido} = crearPersona('Diego','Ortega');
console.log(apellido);
// Si le queremos cambiar el nombre
const {apellido:surname} = crearPersona('Diego','Ortega');
console.log(surname);

//****************** Desestructuracion de argumentos ****************/
// Esto es para cuando tengamos un objeto mas elaborado
const obj = {
    nombre: 'Juanito banana',
    poder: 'cagar de pie',
    vivo: false,
    edad: 40,
    horas: ['No','Se','Nada','Xd'],    
};
// TIP: ************************
/*
    PAra no estar llamando cada una de sus popiedades 
    una por una para hacer lo que queramo hacer
*/
// Entre llaves pones las propiedads que nos interesa
const imprimePropiedades = (nombre,poder,cagar=0,vivo,edad) => {
    // Si le mandamos un argumento que no viene 
    // lo podemos tratar
    //cagar = cagar || 0;//Si no viene le damos un valor poer defecto de 0
    // PAra evitarnos esto le damos el valor al declarlo como paremetor
    console.log({nombre,poder,vivo,edad,cagar});
}

imprimePropiedades(obj);


