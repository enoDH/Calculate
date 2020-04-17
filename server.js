let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
const CONFIG = require('./config/config')
let cors = require('cors')

async function run(){
    let app = express()

    try{
        app.use(cors())
        app.use(bodyParser.json())
        app.use(express.urlencoded({ extended: true}))
    
        await mongoose.connect(CONFIG.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then(
            () =>{ console.log("Connection succesful!")},
            error => { console.log("Connection failed!")}
            );
        
        app.use('/api/', require('./route/calculate.route'))
        app.listen(CONFIG.port, () =>{
            console.log('Server has been running on port ' + CONFIG.port)
        })
    }
    catch(error){
        console.log("Server error", error.message)
        process.exit(1)
    }
}

run()