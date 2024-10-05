/*
    Singlenton: Es una instancia unica de la clase    

    Supongamos que tenemos una clase en la que solo requerimos que
    sea instanciada una vez en toda la aplicacion

    La idea del singlenton tener una unica instancia que
    que sin importar todas las veses que usemos 'new'
    simpre nos regresa la misma instancia de la clase
    (Es util al ccompartir informacion o con el uso de bases de datos)
*/

class Singleton {

    // (ESTOS DOS CAMPOS SON OPCIONALES PUEDE FUNCIONAR DE TODAS FORMAS)
    // Esta va a ser la instancia inicializada de la clase
    // que cuando alguien intente inicializar la clase pero ya a estado inicializada
    // siempre va a regresar este valor
    static instancia; // undefined (Este es el valor que tenien todas las variables cuando las creamo pero no les asignamos ningun valor)
    nombre = ''; 

    /*
        La idea de este Singlenton es que si no tenemos ninguna instancia
        entonces le vamos a asignar lo que tenga como nombre
        a la propiedad pero si ya esta instanciada no imprta que valor se
        le pase a nombre siempre va a regresar el primer nombre original
        con el que se creo la primera instancia
    */
    constructor( nombre = '' ) {
        // PReguntar si esta vacia la instancia
        // Como ya esta inicializada la instancia no debe regresar la primera instnacia
        if ( !!Singleton.instancia ) {
            // La !: Al ser undefined lo opesto la negacion es True
            // La !!: Con doble negacion es para que nos de false (Es mas facil para JS evaluar con Booleanos a estar evaluando null o undefined)
            return Singleton.instancia; // Despues del return se sale del constructor
        }

        // Si no esta vacia la instancia
        // El this aqui hace referencia a la instancia de la clase
        Singleton.instancia = this;

        this.nombre = nombre;

        // Por defecto en el contructor hace esto, El constructro regresa una instancia de la misma clase
        // return this;
    }

}

const instancia1 = new Singleton('Ironman');
const instancia2 = new Singleton('Spiderman'); // Apartir de estos no cambiaran la instancia
const instancia3 = new Singleton('BlackPanther');


console.log(`Nombre en la instancia1 es: ${ instancia1.nombre }`);
console.log(`Nombre en la instancia2 es: ${ instancia2.nombre }`);
console.log(`Nombre en la instancia3 es: ${ instancia3.nombre }`);

