

class Rectangulo {

    // Propiedad privada para que no se modifique fuera de la clase
    // #NombreVariable
    #area = 0;

    constructor(base = 0, altura = 0) {
        this.base   = base;
        this.altura = altura;
        // Tambien al llamar se poner el #
        this.#area = base * altura;
    }

    // Por el momento NO existen metodos privados
    calgularArea() {
        console.log( this.#area * 2 );
    }
}

const rectangulo = new Rectangulo(10, 15);

// No deberiamos modificar los parametros asi directamente
// rectangulo.#area  = 100;
rectangulo.calgularArea();

console.log(rectangulo);



