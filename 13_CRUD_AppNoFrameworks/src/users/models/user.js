
// Objeto del usuario que vamos a usar en la aplicacion (Esto es la representacion del usuario en la base de datos)
// Esto es lo que vamos a usar en la aplicacion porque es la data que vamos a trabajar (No los nombres que vienen en el backend)
export class User {

    // Este objeto "userDataLike" la idea es que el constructor reciba la Data como nosotros la estamos esperando
    /**
     * 
     * @param {Like<User>} userDataLike 
     */
    // De una vez desetructuramos los datos entre {} y le pasamos las propiedades parecidas a como vienen en el backend
    // Nosotros no queremos que se maneje como vienen "first_name" y "last_name" sino que mejor vamos a implementar el camelCase
    constructor({ id, isActive, balance, avatar, firstName, lastName, gender }) {
        this.id       = id;
        this.isActive = isActive;
        this.balance  = balance;
        this.avatar   = avatar;
        this.firstName = firstName;
        this.lastName  = lastName;
        this.gender    = gender;
    }
    /*
        Crearemos la instancia y le mandamos un objeto que tiene que tener estas propiedaes 
        la ventaja tambien de esto es que si alguna propiedad no viniera, le podemos poner defecto
        aqui un valor como "isActive = false" o ponerle valores por defecto al crear la instancia

        Este seria el dato que esperamos en el Backend pero asi no va a hacer match por el cambio de
        nombre de las propiedades entonces aqui es donde entra el Mapper
        este sera el intermedio que sirve para ver como vienen los datos del backend y generar una instancia
        basado en lo que requerimos, asi el dia de mañana que ocurran cambios en el backend solo tenemos que
        crear un nuevo Mapper que se va a adaptar a los datos como vienen en el servidor a como nosotros los
        requerimos en la aplicacion con esta clase creada

    */

}
