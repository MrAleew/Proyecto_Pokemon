const {Router} = require('express');
const router = Router();
const { Tipo } = require("../db.js");
const axios = require("axios");
const {getTipos} = require('./controllers/controllersType');

router.get('/', async(req,res)=>{
    await getTipos()
    const allTipos = await Tipo.findAll();
    res.send(allTipos);
})


module.exports = router