const express = require('express') // sert à récupérer la dépendance Express pour l'utiliser dans le code 
const helper = require('./helper.js') // on récupère le module helper MAIS on pourrait uniquement récupérer la fonction success 
const {success, getUniqueId} = require('./helper.js') // comme ici 
const morgan = require('morgan')
const favicon = require('serve-favicon')
let pokemons = require('./mock-pokemon'); // on récupère le fichier contenant les informations des pokemons

const app = express() // on crée une instance d'une application express (petit serveur web sur lequel fonctionne l'API Rest)
const port = 3000 // constante port sur laquelle on démarre l'API Rest

// on va mettre autant de 'use' que de middleware intégré
app 
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')) // sert à la même chose qu'en dessous mais en mieux car Morgan sert à ça
    //aussi, on n'a pas de next() ici car Morgan et Favicon l'utilisent implicitement


// const logger = (req,res,next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// }

// app.use(logger)



app.get('/', (req, res) => res.send('Hello, express ! 2')) // on définit un premier point de terminaison (chemin)
// le get à 2 paramètres: '/' est le chemin de la route qui va permettre de traiter ce point de terminaison
// Le 2ème arguement est une fonction qui permet de donner une réponse au client quand le point de terminaison est appelé
// elle a elle-même deux arguments : req et res 
// req permet de récupérer un objet Request correspondant à la requête reçue en entrée et res et la Response à renvoyer
// on applique donc .send à l'objet à renvoyer (res)

app.get('/api/pokemon/:id', (req, res) => { // le :id sert à changer le point de terminaison par le bon ID 
    const id = parseInt(req.params.id) // on récupère l'ID de la requête dans la variable ID et on le transforme en entier pour l'étape d'après
    const pokemon = pokemons.find(pokemon => pokemon.id === id) // ici, il faut s'assurer que pokemon.id et id sont du même type, car si on ne fait rien, il y a un entier et une chaîne 
    //res.send(`Vous avez demandé le Pokemon ${pokemon.name}`)  <- ici on ne renvoie rien en JSON (mais ça fonctionne en soit)
    const message = 'Un pokémon a bien été trouvé.'
    //res.json(pokemon) <- fonctionne mais ne renvoie que la réponse JSON
    res.json(success(message,pokemon)) // ici on va renvoyer un message et une data, donc le Pokemon et un message associé au succès, on n'a pas besoin de la syntaxe 'helper.success' car ligne 3
})

app.get('/api/pokemon', (req, res) => { // en argument : renvoie le nombre de pokémons; en code : renvoie la liste des pokémons (en JSON avec message)
    // const nb = pokemons.length
    // res.send(`Il y a ${nb} pokémons dans le Pokédex, pour le moment.`)
    const message = 'La liste de Pokémons a bien été récupérée'
    res.json(success(message,pokemons))
})

app.post('/api/pokemon', (req,res) => { // on désigne le chemin où on applique la requête
    //const id = 123  // choisit arbitrairement, plus tard la BDD donnera un ID unique
    const id = getUniqueId(pokemon)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemon.push(pokemonCreated) // on ajoute
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.` // ptit message normal 
    res.json(success(message, pokemonCreated))
})

app.listen(port, () => console.log(`Application Node démarrée sur : http://localhost:${port}`)) // on démarre l'API Rest sur le port avec un message de confirmation