/*
    Forma moderna de crear Clases y POO

*/

class Persona {
    // Por defecto todas las clases tienen el: 'use strict'

    // Parametros y metodos estaticos nos sirven para usarlos sin
    // tener que instanciar de una clase
    static _conteo = 0;
    // Metodo GET statico para saber cuantes veses se instancio la clase
    static get conteo() {
        return Persona._conteo + ' instancias';
    }

    // Metodo Statico normal
    // Si hacemos refrencia a las propiedades de la clase no van a tener ninguna valor
    static mensaje() {
        // Al ser estaticos no se trabaja con la instancia
        // sino con la estrcura y metodoso estaticos
        console.log( this.nombre ); // undefined
        console.log('Hola a todos, soy un método stático');
    }

    // Propiedades (Inicalizado por defecto)
    // Esto NO es crear variables SON PROPIEDADES
    // Son OPCIONALES ya que podriamos crearlas solo como se crean en el constructor
    nombre = '';
    codigo = '';
    frase  = '';
    comida = ''; // Pero al agregar una nueva propiedad se nos pondra en el constructor

    // Metodo constructor que se ejecuta automaticamente al crear una instancia de la clase
    // Aqui podemos tener valores por defecto porque Si no pasamos ningun argumento al insanciar el valor por defecto sera 'Undefined'
    constructor( nombre = 'Sin nombre', codigo = 'Sin código', frase = 'Sin frase') {
        // Este es el unico que por defecto retorna la instancia del objeto y no undefined

        // Aqui podemos crear variables
        // Pero si creamos 'codigo="ABC"' nos dira que no exista aunque la tengamos como propiedad
        // porque aqui hace referencia el SCOPE dentre del constructor
        // para hacer referencia a las propiedades se usa el 'this'
        this.nombre = nombre;
        this.codigo = codigo;
        this.frase  = frase;

        // Incrementamos para la variable estatica (Si suamos this estariamos haciendo referencia de la instancia)
        Persona._conteo++;

    }

    // Metodos Setter(Modificar las propiedades) y Getters(Mostrar las propiedades)
    // En los set es necesario poner el argumento que recibe para la propiedad
    set setComidaFavorita( comida ) { // Podriamos agregar mas parametros pero no es recomendable
        // El nombre del metodo SET no debe tener el mismo nombre que la propiedad que modifica
        // porque se haria un bucle infinito
        this.comida = comida.toUpperCase();
    }
    // Recuperer el valor de una propiedad
    get getComidaFavorita() {
        // siempre es mejor retornar algo
        // No hay que volver a poner this.NombredelMetodo porque se haria un bucle infinito
        return `La comida favorita de ${ this.nombre } es ${ this.comida }`;
    }

    // Metodos de la clase
    // Po defecto regresan undefined
    quienSoy() {
        console.log(`Soy ${ this.nombre } y mi identidad es ${ this.codigo }`);
    }

    miFrase() {
        // Siempre que queramos mandar a llamar algo de la propia clase
        // tenemos que usar el 'this' por el SCOPE sino dara error
        this.quienSoy();
        console.log(`${ this.codigo} dice: ${ this.frase }`);
    }

}


//                      Crear instancias de la clase
const spiderman = new Persona( 'Peter Parker', 'Spiderman', 'Soy tu amigable vecino Spiderman' );
const ironman   = new Persona( 'Tony Stark', 'Ironman', 'Yo soy Ironman' );
// console.log( ironman );

// LLamar a los metodos
// NombreClase.NombreMetodo();
spiderman.miFrase();
// ironman.miFrase();

// Para usar los set es como mandar a llamar cualquier propiedad
spiderman.setComidaFavorita = 'El pie de cereza de la tía May';

//                      Cosas MALAS DE POO EN JS
// Al hacer esto con una propiedad que no exite No da ERROR y lo toma como una propiedad existente
spiderman.nemesis = 'Duende Verde' // NO HAcer
// Esto tambien modifica porque NO SON PRIVADAS LAS PROPIEDADES
// en futuras versiones se va a implementar aunque Chorme ya lo soporta
spiderman.comida = 'Duende Verde';

// Al llamar ell get es como una propiedad sin los ()
console.log( spiderman.getComidaFavorita );

// Si imprimimos el objeto el set no sale como tal solo sale el parametro
// En el __proto__ donde si sale definido el SET
// console.log( spiderman );

// Al llamar las propiedades estaticas llamamos directamente de la classe
// Persona._conteo = 2;
console.log('Conteo stático', Persona._conteo );
console.log( Persona.conteo );
Persona.mensaje();

// Podemos definir propiedades estatics fuera de la clase
// Nuevonombre 'propiedadExterna '
Persona.propiedadExterna = 'Hola Mundo';

console.log( Persona.propiedadExterna );
console.log( Persona );