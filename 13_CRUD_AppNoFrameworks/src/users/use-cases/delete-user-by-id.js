
/**
 * @param {String|Number} id
 */
 export const deleteUserById = async( id ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    const res = await fetch(url, {
        method: 'DELETE',
        // Los headers aqui es opcional
    });

    const deleteResult = await res.json();// Respues aunque la eliminacion no regresa nada
    console.log({ deleteResult });

    return true;
}
