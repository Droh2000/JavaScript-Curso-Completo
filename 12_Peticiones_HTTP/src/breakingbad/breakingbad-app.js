/*
    Hacer la Peticion HTTP

    Por cuestiones practicas vamos a crear todo el codigo Aqui pero tratemos de crear modulos, funciones separadas

    Con esto vamos a salir de la aplicacion llegar a ese destino, tomar la informacion y regresarla a nuestra aplicacion
*/
/**
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async() => {
    // Hacer la peticion HTTP
    // fetch() -> Le pasamos la URL y esto nos regresa una promesa (Entonces podemos trabajar de forma asyncrona)
    const res = await fetch('https://www.breakingbadapi.com/api/quote/random');
    // res -> por defecto es el body de toda la respuesta obtenida y tiene diferentes parametros
    // Para obtener el body es con el .json() que es de tipo promesa
    const data = await res.json();
    // data es un arreglo donde tenemos los datos del mensaje obetnido
    // Lo que nos interesa esta en la primera posicion del arreglo    
    console.log(data[0]);
    // Dentro de un fetchQuote() se manejaria si se obtuvo correctamente o no la peticion
    return data[0];
}


/*
    Esto lo ponemos con una "B" mayuscula porque queremos que esto sea considerado como 
    la aplicacion propia que estamos creando en Javascript (Indicamos que es un componente
    es una pieza reutilizable de la aplicacion que la mandamos a llamar y va a hacer cierto trabajo)
*/
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async( element ) => {
    // Como vamos a hacer tareas asyncronas tenemos que hacer que el usuario supiera cuando la aplicacion esta
    // cargando la informacion, porque se termina la ejecucion del programa y JS hace la peticion HTTP y mientras
    // trae los datos queremos indicar que esta cargando
    document.querySelector('#app-title').innerHTML = 'Breakingbad App'; // Bucamos el elemento con ese ID y le cambiamos el contenido
    element.innerHTML = 'Loading...';
    // await fetchQuote();

    // Renderizar en Pantalla el contenido Obtenido del API
    const quoteLabel = document.createElement('blockquote');// Elemento HTML con apariencia
    const authoLabel = document.createElement('h3');// Titulo
    const nextQuoteButton = document.createElement('button');// Boton para que el usuario traiga el siguiente contenido de la API
    nextQuoteButton.innerText = 'Next Quote';

    // Aqui recibimos en "data" la respuesta de los datos que queremos mostrar
    const renderQuote = ( data ) => {
        // Estas propieadades .quote, .author son propiedades que tenemos por la API que estamos llamando en su informacion
        quoteLabel.innerHTML = data.quote;
        authoLabel.innerHTML = data.author;
        // Renderizamos la informacion (De este "element" va a remplazar todo su "children" y crea la informacion que le pasemos)
        element.replaceChildren( quoteLabel, authoLabel, nextQuoteButton );
    }

    // Añadir listener
    // Renderizar la nueva llamada a la APi haciendo click al boton
    nextQuoteButton.addEventListener('click', async() => {
        // Para que la persona no pueda volver a tocas el boton mientras carga la informacion
        element.innerHTML = 'Loading...';// Todo lo que estaba en el RenderQuote se remplaza por el Loading
        // Nuevo Quote para volver a llamar el RenderQuote
        const quote = await fetchQuote();
        renderQuote( quote );
    })
    
    // Mandamos a llamar la funcion que renderiza
    // con el fetchQuote() es la funcion para hacer la peticion y cuando se resuelva
    // vamos a tener la respuesta y mandamos a llamar la funcion
    fetchQuote()
        // (data) => renderQuote(data) -> Como data solo se manda como argumento a la funcion se puede solo pner la funcion como abajo
        .then( renderQuote );
}