let express = require('express')
let router = express.Router()
let calculate = require('../model/calculate.model')

// Path 'localhost:port/api/'

router.get('/', async (req, res) => {
    try {
        let vyrazy = await calculate.find()
        res.json(vyrazy)
    } catch (error) {
        res.json({message: error})
    }
})

router.post('/', async (req, res) => {
    try{

        let vyraz = new calculate({ 
            vyraz: req.body.vyraz,
        })
        await vyraz.save()
        res.status(201).json({message: "Add new vyraz!"})
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

module.exports = router