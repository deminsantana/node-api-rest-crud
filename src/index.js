const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')
const cors = require('cors')
const UserRoute = require('./routes/user')
const UserDetailRoute = require('./routes/userdetail')
const path = require('path')
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body)
    next()
})
app.use(bodyParser.json())
app.use('/api/user', UserRoute)
app.use('/dashboard', verifyToken, dashboardRoutes)
app.use(cors(corsOptions))
app.use(UserRoute)
app.use(UserDetailRoute)
app.use(express.static('public'))

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('No existe esta ruta')
})

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Rest CRUD' })
})

// Creamos la variable de configuración
// evitará que el navegador cierre la conexión entre cliente y servidor
var corsOptions = {
    origin: '*', // Aqui debemos reemplazar el * por el dominio de nuestro front
    optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
}

// Permite leer el request tipo json que enviaremos por el POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Puerto del Servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`El Servidor a iniciado en el puerto: ${PORT}`))

mongoose.connect('mongodb://localhost:27017/apicrud')

/* Mongo Atlas
dsantana
LMSPTy7yLyp2WqA8
uri: mongodb+srv://dsantana:<password>@cluster0.6qaol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority */

// Datos de Mongo Atlas (Cloud)
/* USER = "dsantana";
PASSWORD = "LMSPTy7yLyp2WqA8";
DBNAME = "Cluster0";

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.6qaol.mongodb.net/${process.env.users}?retryWrites=true&w=majority`

mongoose
    //.connect('mongodb+srv://dsantana:LMSPTy7yLyp2WqA8@cluster0.6qaol.mongodb.net/Cluster0?retryWrites=true&w=majority')
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos')
    })
    .catch((e) => {
        console.log('Database error', e)
    }) */