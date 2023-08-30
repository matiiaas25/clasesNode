// process: porporciona info y control sobre el proceso actual de ejecucion

//argumento de entrada
console.log(process.argv)
//Controlar el proceso y su salida
process.exit(0) // 0 = todo fue bien, 1 que salga porque hubo un error

//controlar eventros del proceso 
process.on ('exit', () => {
    //accion a realizar
})

//current working directory = desde que carpeta estamos ejecutando el proceso
process.cwd()

//platform
console.log(process.env.NODE_ENV)