/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 * 
 * Este es un juego donde conseguiendo 21 puntos ganamos si nos pasamos perdemos y tenemos que ir pidiendo cartas hasta llegar o pasar 21
 */

// Variables declaradas de forma global para poder acceder con los metodos
let deck         = []; // Aqui es donde vamos a ir metiendo las cartas que tenga el jugador al dar click en el boton
const tipos      = ['C','D','H','S']; // Tipos de cartas que tenemos
const especiales = ['A','J','Q','K']; // Con las otras cartas que no son numeros

// Acumular el puntaje y poder modificarlo
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML (Acceder a los botones con su ID)
// para no estar llamando a document muchas veses
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

// Referencias para meter las cartas nuevas que vayan pidiendo (Las imagenes)
const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// Acceder al puntaje del HTML que esta entre la etiqueta small
// Como los dos puntos estan entre el SMALL con el  '.querySelectorAll' nos regresara una lista
// con los dos SMALL que haya encontrado
const puntosHTML = document.querySelectorAll('small');

// Esta función crea un nuevo deck
const crearDeck = () => {
    // Aqui vamos a crear todas las cartas
    // Viendo las imagenes deberiasmo 
    // empezar con los numeros desde el 2 hasta el 10
    for( let i = 2; i <= 10; i++ ) {
        // Para agregar la parte de las letras al lado del numero que son
        // C D H S (Recorremos el arreglo donde almacenamos los tipos)
        // para conseguir que nos agrege la letra al numero 
        for( let tipo of tipos ) { // Se ejecutara una vez por cada tipo de letra
            deck.push( i + tipo);
        }
    }

    // Ahora nececitamos crear las letras: J,Q,K
    for( let tipo of tipos ) { // Lo ejecutamos por cada tipo de carta para cada Carta especial
        // Al tipo respectivo le agregamos la carta especial    
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck ); (Verificar que tenemos todas nuestras cartas completas)

    // Tenemos que revolver las cartas y que no salgan ordenadas
    // En este caso tenemos que usar una LIBRERIA DE TERCEROS (underscore.js)
    // para usar el metodo 'shuffle' que recibe un arreglo y lo regresa de manera aleatoria
    // Se madna a llamar con el guion bajo _ y retrona un arreglo
    deck = _.shuffle( deck );
    console.log( deck );
    return deck; // Cada ves que se manda a llamar se tienen un nuevo arreglo barajeado
}

crearDeck();


// Esta función me permite tomar una carta (Como ya esta reburujado el arreglo da igual como tomemos los datos)
const pedirCarta = () => {
    // Medida de seguridad ya no deberia seguir ejecutandose el juego
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    // Tomamos la ultima carta, si quisieramos la primera seria con un Shift
    const carta = deck.pop();// Nos retorna la eliminada (Tomada) y la quita del arreglo orignial
    return carta;
}

// pedirCarta();
// Recibimos la carta que quere que evaluea para saber cual es el valor de dicha carta
const valorCarta = ( carta ) => {
    // Ejemplo: Supongamos que recibimos por parametro: 
    //          "2D"    
    // El 2D vale lo mismo que el 2C,2H

    /* PODRIAMOS TAMBIEN USAR EXPRESIONES REGULARES */
    // El primer paso es Extraer el "2" pero hay 
    // que tener en cuenta para cuando sea mas de un digito como el 10
    // Tambien aplica para las letra como "JD" a "J"
    // Vamos a cortar de la pocicion 0 (En los String la primera letra seria ese indice)
    // hasta carta.length - 1 para asi eliminar la ultima letra independientemente si es un "2" o un "10"
    const valor = carta.substring(0, carta.length - 1);// Este metodo nos regresa un nuevo substring cortado del original
    // ahora hay que saber si lo que tenemos es o no un numero
    // Con isNaN() evaluamos si NO es un numero regresa TRUE y si es un FALSE
    return ( isNaN( valor ) ) ? 
            // En el caso de las letras para sacar el puntaje que vale
            // J, K, Q Valen 10 puntos exepto de la A qie vale 11
            ( valor === 'A' ) ? 11 : 10 // Si el valor es A como el la excepcion valdra 11 si no es 10
            // Si no es una letra entonces es un numero
            : valor * 1; // Hay que convertir el STRING a un Numero porque es el puntaje que vale esa carte
    // el numero de los puntajes es lo que se retorara en la funcion con saber el valor de la carta        
}

// Apuntes del DOM
// .querySelector('ElementoHTML') - Recupera el primer elemento que encuantra segun la condicion dada
// .querySelector("ElementoHTML") - Regresa todos los elementos que cumplen la condicion
// .querySelector('img').src=LARUTA (Nos regresa la ruta completa de donde se encuentra la imagen) lo podemos igualara .querySelector('img').src=LARUTA (CAmbiando solo la imagen)

// innerText() - Nos permite agregar texto dentro de la etiqueta html
// innerHTML() - Agregar elementos HTML

// Ejemplo: Queremos cambiar el puntaje del jugador (El 0 que esta por defecto entre las etiquetas small)
// document.querySelector('small')
// document.querySelector('small').innerText = 10 (Cambiamos el puntaje a 10)
// Cambiamos todo el contenido de la etiqueta por el HTML: document.querySelector('small').innerHTML = '<b>Hola Mundo</b>'

// Buscar el ID
// document.querySelector('#NombreDelID')
// Buscar la CLase
// document.querySelector('.NombreDelaClase')

// RECOMENDACION: Hay que evitaar hacer muchas llamadas con el documento porque cada vez JS
//                Lee todo el documento, lo mejor es si vamos a usar uno varias veses es almacenarlo en una variable
// const titulo = document.querySelector('.titulo');
// titulo.innerText = 'Cambio texto';

// Crear elementos HTML (Con el DOM)
// Primero hay que saber donde Ubicarlo (Dentro de cual elemento HTML)
// Lo mejor es ponerle un ID donde a ir elemento En este caso es 'id="divBotones"'
// 
// Ejemplo: Queremos Crear un Boton
// const divbotones = document.querySelector('#divBotones'); (Ubicamos en que parte ponerlo)
// const botonNuevo = document.createElement('button'); Entre () va el nombre de la etiqueta de lo que queremos crear
// divbotones.append(botonNuevo) Asi agregamos el boton nuevo al lugar
// HAY QUE RECORDAR QUE TODO LOS OBJETOS SE PASAN POR REFERENCIA Por consecuencia al modificar 'const botonNuevo' modificara todo (Hay una relacion entre la variable y el HTML)
// botonNuevo.innerText = "Texto del boton"
// botonNuevo.classList.add('btn') Esto es para agregarle en el parametro 'class' el estilo de bootstrap
// botonNuevo.classList.add('btn-success')
/*
    Ejemplo: Queremos Crear un INPUT al final del BODY
    const input = document.createElement('input'); // Creamos un input
    document.body.append(input); // Lo queremos agregar en el body
    // Le modificamos el estilo al input
    input.classList.add('from-control');
    input.placeholder = 'Hola Mundo'; // Podemos acceder a todas las propiedades del input (El elemento creado)
*/

// turno de la computadora
/*
    Aqui la logica es que la compu va a tener dos reglas interesantes
    1.- Tiene que hacer los puntos igual o superiro al jugador
        Cuando el jugar decide detener el JUego (El ya tiene una Cantidad X de puntos)
        entonces la compu tiene como objetico unicamente de superar la cantidad X 
        porque si es igual a la misam del jugador entonces nadien gana
        (Tenemos una condicion que depende del puntaje del jugador)
    Este metodo se dispara en dos ocaciones
        Cuando el jugador pierde
        Cuando toca el boton de Detener    
*/
const turnoComputadora = ( puntosMinimos ) => {
    // Los puntosMinimos son los puntos del jugador
    // Por lo demos ejecutar alguna vez porque el usuario almenos siempre va a pedir una carta
    do {
        // Toda esta parte es parecida a lo del jugador
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        // Aqui es el puntos de la computadora
        puntosHTML[1].innerText = puntosComputadora;
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        // Se lo metemos al HTml de la computadora
        divCartasComputadora.append( imgCarta );
        
        // Si el puntaje del jugador es mayor a 21 no hay que seguir con el ciclo
        if( puntosMinimos > 21 ) {
            break;
        }

        // Condicion para que se sigua ejecutando
        // Hay que limitar que los puntos no se pasen de 21
    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    // En este punto ya tenemos los puntos de la computadora y los del jugador
    // Aqui podemos determinar cual de los gano
    // setTimeout() para que ejectue el Alert depsues de terminar este hilo para que se muestren las cartas de la computadora 
    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) { // Si el jugador pierde
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) { // Si la computadora pierde
            alert('Jugador Gana');
        } else {
            // Porque el alert no salia cuando la computadora ganaba
            alert('Computadora Gana')
        }
    }, 100 );
}



// Eventos
// Nos interesa escuchar el click
// Mandamos una funcion como argumento (Llamada Callback)
btnPedir.addEventListener('click', () => {
    // Cuando se haga click en el boton se dispara toda esta accion de la funcion

    const carta = pedirCarta();// Tomamos una carta
    
    // queremos saber cuantos puntos va acumulando la persona
    // Los incrementamos con el valor de la carta que tomamos
    puntosJugador = puntosJugador + valorCarta( carta );
    // Los de la pocicion 0 son los del jugador y le damos el valor de los puntos acumulados
    puntosHTML[0].innerText = puntosJugador;
    
    // Queremos crearnos una nueva carta cada vez que demos click aqui
    // Nosostros ya tenemos la carta en la variable de arriba y tambien la zona donde va a ir
    // que es en el id="jugador-cartas"
    // Vamos a tomar la nueva carta y meterla al HTML
    // Las referencias por ID las creamos como variables arriba
    // TENEMOS QUE CREARNOS ESTA IMAGEN DE FORMA DINAMICA tomando en cuenta la ruta:   
    //      <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement('img'); // Crear una imagen
    // Le agregamos el Source que es todo igual al que tenemos en la ruta 'src=""'
    // PERO CAMBIANDO la imagen por la carta que se obtuvo
    imgCarta.src = `assets/cartas/${ carta }.png`; //Aqui ya podria ser cualquier cosa 3H, JD
    // LE agregamos el diseno CSS en la clase
    imgCarta.classList.add('carta');
    // Agregamos al HTML
    divCartasJugador.append( imgCarta );

    // Controlar la logica de los puntos
    if ( puntosJugador > 21 ) { // Aqui ya perdio
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true; // Desactivamos los botones al ususario
        btnDetener.disabled = true;
        // Despues de jugar el jugadron gane o pierda le toca a la computadora
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ) { // Si Gano
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

// Deneter la jugada del jugador
btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    // Se desactivan los botones y solo jugara la computadora si logra pasar el puntaje del jugador
    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener('click', () => {
    // Borrar y resetaer todo
    console.clear();
    deck = []; // Limpiamos las cartas
    deck = crearDeck(); // Volvemos a reburujar y conseguir nuevas cartas

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    // Habilitar botones en caso de deshabilitarlos
    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});


