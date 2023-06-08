// const success = (message, data) => {
//     return{
//         message: message,
//         data: data
//     }
// }

// exports.success

//méthode permettant de mettre un message en cas de succès
exports.success = (message, data) => {
    return{message, data}
}

// méthode permettant de générer un identifiant unique
exports.getUniqueId = (pokemon) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id) // on transforme le tableau des pokemons en tableau d'ID des pokemons avec la méthode JS map
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a,b)) // on calcule l'id le plus grand dans le tableau qu'on a créé
    const uniqueId = maxId + 1

    return uniqueId
}