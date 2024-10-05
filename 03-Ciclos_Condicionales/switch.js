

const dia = '2'; // 0: Domingo

switch( dia ) {
    // Cuando tenemos valores especificos como int o string
    case 0: // Por defecto hace un ===
        console.log('Domingo');
        break;
    case 1: 
        console.log('Lunes');
        break;
    case '2': // Este no entra si solo son valores enteros
        console.log('Martes');
        break;
    default:
        console.log('No es lunes, martes o domingo');
}



