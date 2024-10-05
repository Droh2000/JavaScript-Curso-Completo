/*
    Sin POO - Las problematicas que podriamos tener si solo creamos objeto

    Asi es como le hacian las personas antes de la implementacion de POO

*/

// Estos objetos no tienen la obligacion de tener las mismas propiedades
// y les podriamos cambiar el nombre de los parametros por error
const fher = {
    nombre: 'Fernando',
    edad: 30,
    // Simulacion de un metodo para mostrar los dos parametros anteriores
    imprimir() {
        // Como no estamos en el mismo Scope tenemos que usar this
        // para hcar referencia al mismo objeto
        console.log(`Nombre: ${ this.nombre } - edad: ${ this.edad }`);    
    }
}
// Vemos que si nececitariamos muchos objetos tendriamos que estar copiando codigo
const pedro = {
    nombre: 'Pedro',
    edad: 15,
    imprimir() {
        console.log(`Nombre: ${ this.nombre } - edad: ${ this.edad }`);    
    }
}

// fher.imprimir(); Lo anterior fue un problema que se dio

//  Para lo anterior JS implemento esto hace muchos anios
// Antes del EMC 6 se creo la forma de crear objetos que se requieren que tengan el mismo tipado
// Objetos con la misma metodos, propiedades y que se pueda hacer la herencia y crear instancias

// Al crear la funcion con la letra mayusculas indicando que nos va a servir
// para crear instancias (No es obligacion de la letra)
//
// Le indicamos como parametros que queremos crear como propiedad el nombre y edad
// Ok esto se debe de crear con la palabra new
function Persona(nombre, edad) {
    console.log('Se ejecutó esta línea');
    // Crear esta funcion en un generador de instancia
    // creamos las siguientes propiedades (this hace referencia a esta funcion Persona) 
    this.nombre = nombre;
    this.edad   = edad;   
    // Implementar el metodo 
    this.imprimir = function() {
        console.log(`Nombre: ${ this.nombre } - edad: ${ this.edad }`);    
    }

}

// Creamos unas instancias con la palabra 'new'
const maria   = new Persona('María', 18);
const melissa = new Persona('Melissa', 35);
// console.log( maria );
maria.imprimir();
melissa.imprimir();

/*
    Al imprimir vemos el prototype
    es el '__proto__': con esto el objeto sabe de quien depende
    o de quien esta heredando
*/

/*
    Hoy en dia ya no es recomendable trabajar con esto a solo
    que queramos tener compatibilidad con navegadores muy viejos

*/

