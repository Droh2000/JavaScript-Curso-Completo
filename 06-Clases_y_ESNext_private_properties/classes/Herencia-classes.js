/*
    Practicar la herencia entre clasees

*/


class Persona {

    static _conteo = 0;
    static get conteo() {
        return Persona._conteo + ' instancias';
    }

    static mensaje() {
        console.log( this.nombre ); // undefined
        console.log('Hola a todos, soy un método stático');
    }


    nombre = '';
    codigo = '';
    frase  = '';
    comida = '';

    constructor( nombre = 'Sin nombre', codigo = 'Sin código', frase = 'Sin frase') {
        
        this.nombre = nombre;
        this.codigo = codigo;
        this.frase  = frase;

        Persona._conteo++;
    }

    set setComidaFavorita( comida ) {
        this.comida = comida.toUpperCase();
    }
    get getComidaFavorita() {
        return `La comida favorita de ${ this.nombre } es ${ this.comida }`;
    }


    quienSoy() {
        console.log(`Soy ${ this.nombre } y mi identidad es ${ this.codigo }`);
    }

    miFrase() {
        this.quienSoy();
        console.log(`${ this.codigo} dice: ${ this.frase }`);
    }

}

class Heroe extends Persona{ 
    // Propiedad unica que se difet=rencia de la clase padre
    clan = 'sin clan';

    constructor(nombre, codigo, frase) {
        // Siempre debemos de llamar al constructor padre
        // Los parametros que vamos a reutilizar de la clase padre
        super(nombre, codigo, frase);

        // Los this siempre van despues de super()
        // Esta es la nueva propiedad que tendra esta clase
        this.clan = 'Los Avengers';
    }

    // Asi sobre escribimos el metodo
    quienSoy() {
        console.log(`Soy ${ this.nombre }, ${ this.clan }`);
        // si aun nececitamos lo codificado que ya esta en el padre
        // haci hacemos referencia a los metodos de la clase
        super.quienSoy();
    }

}


const spiderman = new Heroe( 'Peter Parker', 'Spiderman', 'Soy tu amigable vecino Spiderman' );
// const spiderman = new Heroe();

console.log( spiderman );
spiderman.quienSoy();





