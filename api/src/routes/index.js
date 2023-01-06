const { Router } = require('express');
const pokemons = require('./pokemons.js');
const tipos = require('./tipos.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemons);
router.use('/tipos', tipos);

module.exports = router;
