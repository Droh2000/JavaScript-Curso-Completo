import modalHtml from './render-modal.html?raw';// Para importar HTML finalizamos con ?raw pero esto solo funciona en VITE con otro framework tenemos que ver como se hace
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';
// Para agregarle el efecto que queremos de aparecer en una ventana encima de la aplicacion se requiere el CSS
import './render-modal.css';

// Como los elementos modal y form los vamos a requerir usar en diferentes funciones los creamos aqui
let modal, form;
// Con esto sabemos si hubo informacion cargada y luego agregarsela al objeto que vamos a mandar a guardar
let loadedUser = {};// Para tomar los datos del formulario que es un objeto vacio

// El comportamiento esperado del Modal es que al estar abierto y hacer click afuera 
// el modal se debe ocultar y ademas el boton "+" es el que lanze el modal 
// Esta funcion ademas carga el usuario por ID porque:
/*
    Cuando Le demos click al boton de Select en la tabla debemos de cargar la informacion
    del usuario en los campos del formulario abriendonos la ventana modal
    Primero requerimos saber cual es el ID de la persona y luego cargar la informacion al modal

    El ID lo podemos recibir como un String o como un numero (Sin importar como venga podemos trabajar con cualquiera de los dos)
    
*/
/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {
    // Si queremos mostrar el modal tenemos que eliminar la clase "hide-modal"
    // Con el simbolo ? es para verificar que Si existe ejcuta la accion de eliminar la clase
    modal?.class
    
    List.remove('hide-modal');
    // Nos asegurames que siempre este vacio y asi podamos hacer el operador Spread sin problemas "..."
    loadedUser = {};

    // Si no existe el Id no hay que hacer nada 
    if ( !id ) return;
    // Si existe el ID (Hacemos uso de este Use-Case)
    const user = await getUserById( id );
    setFormValues(user);
}
// Para coultar el modal
export const hideModal = () => {
    // Agregamos la clase que borramos al mostrarlo
    modal?.classList.add('hide-modal');
    // Limpiamos el formulario (? si es que existe)
    form?.reset();
}

// Para Cargar la informacion dentro de los campos del formulario
/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    // Establecemos los valores del formulario
    // Buscamos el campo del formula con el nombre especificado
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    // Ponemos este para que cuando una persona venga y este editando un usuario
    // en este caso solo tenemos informacion del formulario no informacion adicional que vienen en los campos
    // Entonces si guardamos lo que va a pasar es que se van a sobrescribit los datos (Es importante que el objeto sismepre este vacio)
    loadedUser = user;
}



/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<void> } callback
 */
export const renderModal = ( element, callback ) => {
    // Verificamos si el modelo ya esta creado en caso de si solo utilizamos
    if ( modal ) return;
    // Si no existe el modal entonces vamos a crearlo
    modal = document.createElement('div');
    modal.innerHTML = modalHtml;// le pasamos el HTML del archivo
    // el hide-modal es para mostrar u ocultar la ventana modal
    modal.className = 'modal-container hide-modal';// LE agregamos un par de clases
    form = modal.querySelector('form');// De la variable local seleccionamos el form del HTML para tomar como referencia todo el formulario

    // Para ocultar el modal cuando se hace click afuera del formulario
    // tenemos que detectar dentro de que esta creado, el modal esta creado dentro del contenedor
    // modal-container asi que escuchamos cuando alguien haga clic
    modal.addEventListener('click', (event) => {
        // Con event.target obtenemos el nombre donde hacemo clic asi que especificamos el nombre de la clase
        if ( event.target.className === 'modal-container' ) {
            hideModal();
        }
    });

    // Por defecto cuando hacemos click en el Boton del formulario automaticamente hace el envio y recarga la pagina
    // queremo evitar eso porque no vamos a hacer nada eso, solo usaremos HTTP justamente para evitar que se recarge la pagina
    // Esuchamos el evento submit  que es cuando se da click en ese boton del formulario
    form.addEventListener('submit', async(event) => {
        // Para prevenir el comportamiento por defecto del formulario que es la propagacion del mismo y enviarlo
        event.preventDefault();// con esto prevenimos el comportamiento por defecto
        /*

                Tomar los Datos del Formulario
            
            Una forma muy pesada seria tener con el querySelector seleccionar cada uno de los campos
            del formulario y almacenarnos en variables, esta tarea de hacer diferentes referencias HTML 
            no tiene caso hacerlo manual si podemos aprovechar un objeto de JS que se llama FormData 
            que nos sirve para extrer los datos, desafortunadamente para resetear los valores no es tan facil
            porque si vamos a tener que hacer esa referencia manual
        */
        const formData = new FormData( form );// Le mandamos la referencia al formulario
        // Para esparcir los valores que tenga este usuario si es que tiene informacion
        const userLike = { ...loadedUser };// Data para almacenar los datos del formulario
        // Con el bucle vamos a recorrer cada uno de los elementos que esten en el formulario
        // Por defeccto del fromData nos regresa un objeto con pares de valores segun la cantidad de campos del fomularios
        // Hay que tener en cuenta que todos los campos nos lo va a regresar como String
        for (const [key, value] of formData) {// Desestrcuturamos para obtener el par clave valor del objeto fromData
            // Para pasar el dato Numerico a numero porque lo obtenemos por defecto como String
            // porque nuestro backend no tiene niguna validacion y lo va a aguardar como un string
            if ( key === 'balance' ){
                // Aqui estamos usando propiedades computadas del objeto
                userLike[key] =  +value;// Aqui lo estamos convirtiendo a un numero
                continue;// Hacemos la siguiente operacion del ciclo
            }
            // Aqui podemos realizar validaciones, analizar los campos, etc
            // Tambien hay paquetes especificos para manejar formularios en JS (Esto depende del framework que estemo utilizando)

            // Aqui tenemos que hacer una convercion con este campo para pasar de los valores String a un booleano
            if ( key === 'isActive' ) {
                // Este campo que esta en "key" le pasamos el valor convertido
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }
            // Caso contrario simplemente se agregan solo los demas valores que serian todos String por eso no hay mas conversiones
            userLike[key] = value;
        }

        // console.log(userLike);
        await callback( userLike );// Le mandamos el usuario al callback (Asi al hacer click en el boton se guarda un nuevo usario o se actualiza)

        hideModal();// Ocultamos la veneta una vez que se manden los datos al backend    
    });

    element.append( modal );
}
