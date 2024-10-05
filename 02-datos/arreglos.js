// Cada vez que veamos [] son arreglos

// Version antigua
const arr = new Array(10);// de tamano 10
console.log(arr);

// Creacion
let juegos = ['Gta','CFD','Man','tetrix'];
// Imprimir nombre de la variable y su pocicion
console.log({juegos});

// Acceder a sus pociciones
juegos[0];

// Se almacena cualquier cosa
let arrCosas = [
    true,
    123,
    'Juan',
    1+2,
    function(){},
    ()=>{},
    {a:1},
    ['cj','niko','nose','que','poner',
      ['otro','arreglo','alv']
    ]
];

console.log(arrCosas);
// Acceder a true
arrCosas[0];
// Acceder a 'poner'
arrCosas[7][4];
// acceder a 'arreglo'
arrCosas[7][5][1]
