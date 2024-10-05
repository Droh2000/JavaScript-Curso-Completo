import { v4 as uuid } from 'uuid';// Importamo la version 4 para los ID de los Todos

// CReamos como clase y no funcion porque queremos hacer instancias
export class Todo {
    // Parte de crear un TODO que es un tarea pendiente
    // en este caso solo ocupamos la descripcion de esta tarea
    /**
     * 
     * @param {String} description 
     */
    constructor( description ){
        // Necesitamos que nuestro Todo tengan ID unico
        // ya que nos basaremos en el ID para saber cuando algo cambia
        // para esto se uso el paquete UUID para genrar identificadores unicos
        this.id = uuid();
        this.description = description;
        this.done = false; // PAra si ya esta lista o terminada la tarea
        this.createdAt = new Date(); // Detectar la fecha que se creo   
    }

}