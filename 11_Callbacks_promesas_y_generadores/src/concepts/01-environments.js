
// Esto de arriba especificamos como Ayuda el tipo de datos que es el "element"
/**
 * 
 * @param {HTMLDivElement} element 
 */
// Entre parentesis recibimos el elemento HTML para renderizar lo que esea
export const environmentsComponent = ( element ) => {
    // El uso de las variables de entorno dependera del Framework que usemos
    // En node es "Process.Nombre"
    // Pero como estamos en Vite es como:
    console.log( import.meta.env ); // Aqui los nos sale las Variables de entorno que maneja por defecto
    // Para utilizar las variables que nosotros especificamos
    // para esto se llaman en el archivo .env con VITE_NBRE
    // Uso:
    const html = `
        Dev: ${ import.meta.env.DEV } <br/>
        Prod: ${ import.meta.env.PROD } <br/>
        KEY: ${ import.meta.env.VITE_API_KEY } <br/>
        URL: ${ import.meta.env.VITE_BASE_URL } <br/>
    `;
    element.innerHTML = html;

}

