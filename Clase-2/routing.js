const http = require('node:http')

const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
    const { method, url} = req

    switch(method) {
        case 'GET' : 
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset = utf-8')
                    return res.end (JSON.stringify(dittoJSON))
                default : res.statusCode = 404
                res.setHeader('Content-Type', 'text/html; charset = utf-8')     
                return res.end('<h1>404</h1')
            }
        case 'POST' : 
            switch (url) {
                case '/pokemon':
                    let body = ''

                    req.on('data', chunk => { // chunk son porciones de informacion binaria
                        body += chunk.toString() //se vuelve a "unir en el body"
                    })
                    req.on('end', () => {
                        const data = JSON.parse(body)
                        //llamar a una base de datos para guardar la info
                        res.writeHead(201, {'Content-Type': 'aplicattion/json; charset = utf-8'})

                        data.timeStamp = Date.now()
                        res.end(JSON.stringify(data))
                    })
            }    
    }   
}

const server = http.createServer(processRequest)
server.listen(1234, () => {
    console.log('server listening on port http://localhost:1234')
})