const express = require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

//app.use((req, res, next) => {
    //console.log('esto es un middleware') // un middleware es una fase previa al procesado de las request que puede ser para varias o para una en especifico. Asi tambien como para todos los metodos en use o para alguno en especifico
    //ejemplos:
    //trackear request a la base de datos
    //revisar si el usuario tiene cookies
    //se pueden hacer que afecte a todas las request
    //next()
//})

//Ejemplo de middleware reutilizable para cualquier metodo POST
app.use((req, res, next) => {
    if(req.method !== 'POST') return next()
    if(req.headers['content-type'] !== 'application/json') return next()
    //solo llegan request que son POST y que tienen el header content-type: apllication/json
    let body = ''
    // Escuchar el evento data
    req.on('data', chunk => { // chunk son porciones de informacion binaria
        body += chunk.toString() //se vuelve a "unir en el body"
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        //llamar a una base de datos para guardar la info
        data.timeStamp = Date.now()
        req.body = data
        next()
    })
})    


app.get('/', (req, res) => {
    res.status(200).send('<h1>Mi página</h1>')
})

app.post('/pokemon', (req, res) => {
    //req.body debriamos guardar en base de datos
    res.status(201).json(req.body)
})

app.use((req, res) => {
    res.status(404).send('<h1>404</h1> ')
}) // app.use es como un * (todos los metodos)


app.listen(PORT, () =>{
    console.log(`server listening on port http://localhost:${PORT}`)
})