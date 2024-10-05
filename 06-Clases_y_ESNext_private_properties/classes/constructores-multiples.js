/*
        Simulacion el comportamiento de constructores multiples
        esta forma es util para peticiones HTTP
*/

class Persona {

    // Constructor Doble
    // crear un metodo estatico
    // La idea es que cree una nueva instancia de la clase usando su constructor
    // pero enviando un argumento diferente
    // Entre {} para usar la desetructuracion de argumentos
    static porObjeto({ nombre, apellido, pais }) {
        return new Persona( nombre, apellido, pais );
    }

    // Contructro por defecto
    constructor( nombre, apellido, pais ) {
        this.nombre   = nombre;
        this.apellido = apellido;
        this.pais     = pais;
    }

    // imprimimos cada uno de sus propiedades
    getInfo() {
        console.log(`info: ${ this.nombre }, ${ this.apellido }, ${ this.pais }`);
    }
}

// Declaracion de varias variables para mandarselas al constructor de la instancia
const nombre1   = 'Melissa',
      apellido1 = 'Flores',
      pais1     = 'Honduras';

// Valores para mandarlos al constructor que es capas de recibir un objeto
const fher = {
    nombre:   'Fernando',
    apellido: 'Herrera',
    pais:     'Costa Rica'
}      

// Constructor por defeccto
const persona1 = new Persona( nombre1, apellido1, pais1 );

// Nos evitamos el hecho de estar NombreObjeto.Propiedad
// Mejor enviar todo el objeto de golpe
// Como solo es un metodo estatico no lleva el new
const persona2 = Persona.porObjeto( fher );


persona1.getInfo();
persona2.getInfo();



