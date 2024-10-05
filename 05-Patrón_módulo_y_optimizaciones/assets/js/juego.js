/*

        PRINCIPALES PROBLEMATICAS DE LA PROGRAMACION ANTERIRO DEL JUEGO

Si solo programamos en JS y no protegemos el codigo es facil para cualquier persona
ejecutar metodos de la misma programacion o en este caso formas de hacer trampa desde la 
consola del navegador, ademas de que el codigo esta a simple vista para culquiera que ingrese 
a los archivos del proyecto

EL PATRON MODULO: (NOS SIRVE PARA UNA ENCAPSULACION Y PROTEGER EL CODIGO)

Haciendo con la encapsulacion que el codigo quede dentro de un contener privado
de manera que nadien afuera podra manipular las vvariables ni metodos

Sintaxis: (funcion anonima y para ser autoinvocada se encierra entre () con otros ();)
(()=>{
    Nos crea un nuevo Scope el cual no tiene nunguna referencia por nombre
    por lo que no se podra llamar a nada aqui adentro

    Algunas personas usar:
    'use strict' // Para verificar la correcta codifica del codigo internamente
})();
*/
const miModulo = (() => {
    'use strict';

    /*
                    OPTIMIZACION del codigo
        Vamos a tener que refactorizar el codigo para los casos en los que 
        yq eu tenemos varias veces el mismo codigo en ciertas del programa con solo
        algunas pequenas modificaciones                

        A la vez que deberiamos hacer pubic ciertas funciones
        como la funcion de NuevoJuego para que desde otros rchivos se pueda
        reiniciar nuevamente

    */

    let deck         = [];
    // Juntamos las dos declaraciones de la constante
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];
    // Se cambio la declaracion para poder tener varios jugadores
    let puntosJugadores = []; // Tambien para la optimizacion de los codigos que se repetian en las funciones del jugador y computadora

    // Referencias del HTML
    // Se jutaron todas las declaraciones de las constantes
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');
    // Para poder opimizar lo de las cartas como esto depende del HTML
    // y cada uno del jugador como la computadora tenia su propia zona que mostraba su imagen
    // se les agrego la clase 'divCartas' asi podemos obtener todos elementos que tengan esta clase
    // como nos retorna una arreglo y en la forma que estan en el html la primera pocicion va a ser la del jugador
    // y la de la ultima pocicion va a ser la de la computadora
    //
    // Por esto se elimino las dos constantes de jugador y computadora
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    // Se creo esta función inicializa el juego 
    // Para no estar haciendo llamadas a las funciones en cualquier parte del codigo
    // Por defecto el numero de jugador es 2 (Persona y compua), Una regla que vamos
    //   a definir es que el ultimo jugadro siempre va a ser la computaadora
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck(); // creamos que se tomen todas las barajas

        // Vamos a inicializar el arreglo donde la pocicion del arreglo seria cada uno de los jugadores
        // ejemplo [0,0] = con dos jugadroes
        puntosJugadores = []; // PAra reiniciarlo y despues llenarlo
        for( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }
        
        // En este metodo se movio todo lo que estaba en la parte que reiniciabe el juego

        // Como puntosHTML es un arreglo con un bucle
        // ejecutando la funcion callback por cada elemento del arreglo
        // y de esta manera ponemos en 0 puntos los de jugadro y computadora
        puntosHTML.forEach( elem => elem.innerText = 0 );
        // Lo misma para reiniciar las imagenes de las cartas
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    }

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        // Reinizamos la variable que contiene todas las tarjetas
        // Ya que eso no debe hacerse en los eventos
        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo);
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo);
            }
        }
        // Se quita la parte que se iguala a una variable
        // para mejor retornar ya todo
        return _.shuffle( deck );;
    }

    // Esta función me permite tomar una carta
    // Podriamos hacer una funcion de flceha
    // con un solo return con una condicion ternaria
    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        // Se quito la constante para retornar directamente
        return deck.pop();
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    // como estas lineas se repetian en ambos se paso a funciones
    // Turno: 0 = primer jugador y el último será siempre la computadora
    const acumularPuntos = ( carta, turno ) => {
        // Nececitamos saber de cual jugador es el turno
        // Tambien la carta para sacar su valor y acumularlo
        // en el parametro 'turno' se envia el numero de la pocicion
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    
    // Metodo para mostrar la imagen de la carta en el HTML
    const crearCarta = ( carta, turno ) => {
        // Nececitamos la carta y a que div crear la carta (En el turno tenemos quien esta jugando)
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        // Aqui determinamos a que div poner la imagen
        // llamando a la constante que toma la clase que le agregaamos al html
        divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () => {
        // Como por el momento solo van a ser dos jugadores
        // Creamos las doas variables usando la desestructuracion de arreglos
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores; // De aqui se extren los puntos

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );

    }

    // En el turno de la computadora (Es donde se puede optimizar mucho)
    // La intruccion de los puntos es lo misma para la computadora como para el jugador
    const turnoComputadora = ( puntosMinimos ) => {
        // Iniciamos aqui la variable porque la borramos mas arriba
        let puntosComputadora = 0; // Tomara lo que nos regrese el metodo 'acumularPuntos()'

        do {
            const carta = pedirCarta();
            // La computadora siempre va a ser la ultima pocicion del arreglo
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1 );

            // Se quito el if porque ya lo estamos evaluando en el while

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        // Cuando termina la compu se llama para saber el ganador
        determinarGanador();
    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        // Se cambio lo del jugador, la pocicon 0 sera siempre jugador
        // Como por ahora solo hay dos jugadores no hay prblemas
        const puntosJugador = acumularPuntos( carta, 0 );
        // Crear carta del lado del jugador
        crearCarta( carta, 0 );


        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        // Recordar que esto lo cambiamos para que sea un arreglo
        // la pocicion 0 es la del jugador
        turnoComputadora( puntosJugadores[0] );
    });

    // Este es el metodo de antes donde reinciavamos todo para comenzar otro juego
    // Se uso solo como prueba para llamar al metodo que inicia el juego
    // btnNuevo.addEventListener('click', () => {
        
    //     inicializarJuego();

    // });
    // Se comento tambien porque podriaser que se requiera inicializar el juego 
    // En cualquier otra parte no solo interno (No modificar la logica pero si iniciar el juego)

    // Esta es la ultima parte del modulo (Siempre debe ser asi)
    // donde retornemos segun las nececidades
    return {
        // retonamos un objeto
        // Lo que sea que retornemos aqui va a ser publico
        // pero se puede acceder atras de la constante que almacena todo
        // nosotros queremos hacer publico inicializar juego
        // Le damos el valor con el que identificaremo publicamentes este metodo ''nuevoJuego 
        nuevoJuego: inicializarJuego
    };

})();








