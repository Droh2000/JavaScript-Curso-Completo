// Diferentes mensajes en consola

let a = 10;

// Podemos imprimir para saber como se encunetra una variables en un determinado punto de la ejecucion
console.log('a ',a);
console.warn('b ',a);
console.error('c ',a);

let b=11,c=12,d=13;

// Imprimir las variables junto con su nombre Como un objeto
console.log({b});
console.log({c});
console.log({d});

// Agregar CSS
// %c para ingresar un estilo (Le ponemos un texto)
// Despues le pasamos propiedades de CSS
console.log('%c Mis variables','color:blue; font-weight: bold;');

c='Hola ';
d='Pelona';

// Para cuando queramos imprimir muchas variables a la vez
// y para cuando tengan un orden logico
console.table({a,b,c,d});

// El nombre de las constantes se ponen en mayusculas cuando son variables de entorno no hay problema si esta en minusculas
const saludo = c + d;

/*

    Para Hacer DEBUg en la consola y BreakPoint (Es el punto de ejecucion donde se detiene y nos muestra como va la informacion en ese punto)
    (En la consola del navegador --- ctr+shift+i) [Si tenemos problemas que no carga bien la pagina en la pestana de Netwotk activamos el check para desactivar el cache]

(Esto solo jala con un index.html)
1. En la consola a la pestana de 'Sources'
2. seleccionamos el numero de la linea de codigo donde quereamos el Breakpint
3. Recargamos la pagina (Al lado no sale 'Paused on breakpoint')
-- Para pasar a la siguiente linea: Dar click a la flecha curbeada con un punto abajo (F10 o ctrl +)
-- En la parte de alado tenemos el Scope (Dentro Script) que ya inicio la varaible
-- Asi podemos segui dando click en la flecha esa curveada
*  Con la felcha grandota ignoramos todos los breakpoints (ctrl+F8)
*  Terminar con la ejecuion le damos a la felcha azul rayada (F8)


    En VS code (Se tiene que tener instalado NODE)
1. Dar click en el nuemro de la linea de codigo
2. Pestana Debug -- Star Debug (F5) 
3. Arriba nos saldran los mismos botones del navegador
-- Con la flecha curveada con un punto abajo es para ir paso por paso la ejecucion
-- Con la primera flecha es para terminar la depuracion

Vemos con las variables si estan con undefined es porque todabia no tienen un valor definido
*/

// DEbug console y ejecutar para ver el resultado del archivo