
// CLASE 5 - MANEJO DE ARCHIVOS - REVIENDO LA CLASE
// ¿Como conectar con el modulo FS?

    // 1) require('moduloDeseado')
        const fs = require('fs')
        //PROBAR console.log(fs) 
    
    // 2) ES6 modulos
        // Poner en la consola: npm init -y
        //Lo que hace es:
            // le explica a mi carpeta que todo lo voy a englobar en un contexto específico
            // Se puede poner npm init para uno detallar la informacion del proyecto.
            // Si no hay nigun index.js va a tomar como entrypoint el primer archivo que lea
            // Te crea un package.json
            // Agregar "type": "module" en el package.json despues de license y en ese mismo corchete
            // import fs from 'fs' en el archivo que este usando


// ¿Como usar FS?
// Filesystem permite hacer operaciones de lectura, escritura, actualizacion y eliminacion de archivos 
// De tres maneras:

    // A) Sincrono: 
            // CUIDADO: si el archivo ya existe pisa el contenido. No lo agrega.
        
        // CREAR
            fs.writeFileSync('./apunte/archivoDePrueba.txt', "hola soy el primer archivo")
                // PARAMETRO 1: Primero se pone la ruta.
                    //  "./" => creas un path relativo desde el punto de ejecucion del programa, en este caso es la carpeta backend-coderhouse
                
                //PARAMETRO 2: Despues agregás el contenido. Va en formato STRING.
            
        // ACTUALIZAR
            fs.appendFileSync('./apunte/archivoDePrueba.txt', "Esto es un texto agregado posteriormente")

        // CON ARCHIVOS JSON
            const prod = [1, 2, 3, 4]
                fs.writeFileSync('./apunte/archivoDePrueba.json', JSON.stringify(prod))
        
        // LEER 
                // Necesito guardar en una variable o mostrarlo en consola.
            const data = fs.readFileSync('./apunte/archivoDePrueba.json', 'utf-8')
                // PARAMETRO 1: Path
                // PARAMETRO 2: Codificacion. (Depende del tipo de archivo. Se usa este formato para poder leer con un formato especifico.) 
            console.log(data, typeof data)// Tyepof: string
            
            // Leer en formato original que lo subi, ya que si accedo de manera normal me devuelve string
                const dataParseada = JSON.parse(data)
                console.log(dataParseada, typeof dataParseada )
        
        // ELIMINAR
            fs.unlinkSync('./apunte/archivoDePrueba.json')
            fs.unlinkSync('./apunte/archivoDePrueba.txt')
                // UNICO PARAMETRO: Path
        
        // CHEQUEAR SI EXISTE
            console.log(fs.existsSync('./apunte/archivoDePrueba.json'))
                // Esto ahora da false porque en la linea 44 lo borré
    
    
    // B) Callbacks: (ESTO ES ASINCRONO)
        // CREAR
        fs.writeFile('./apunte/fsCallbacks.json', JSON.stringify(prod), (error)=>{
            // PARAMETRO 1: PATH
            // PARAMETRO 2: DATA
            // PARAMETRO 3: CALLBACK que chequee si hubo un error
            if(error){
                console.log(error)
                return //Pones el return porque sino va a tratar de leer el archivo aunque haya ocurrido error
            }
            console.log("Archivo escrito con exito, leyendo archivo...")
            
            // LEER
            fs.readFile('./apunte/fsCallbacks.json', 'utf-8', (error, content)=>{
                if(error){
                    console.log(error)
                    return
                }
                console.log(content) //Typeof STRING de vuelta

                // ACTUALIZAR
                fs.appendFile('./apunte/fsCallbacks.json', 'a', (error)=>{
                    // PARAM 2: Content
                    if(error){
                        console.log(error)
                        return;
                    }
                    // ELIMINAR
                    fs.unlink('./apunte/fsCallbacks.json',(err) => {
                        if (err) throw err;
                        console.log('./apunte/fsCallbacks.json was deleted');
                    });
                })
            })
            
        

        })
        
        
    // C) Promesas
        // PASO 1: creo el contexto
        // PASO 2: escribo lo que quiero hacer
        // PASO 3: lo encapsulo en una logica try/catch para manejar el error
    const context = async()=>{
        try {
            const promisesPath = './apunte/fsPromisesFile.txt'
            // CREAR
            await fs.promises.writeFile(promisesPath, 'Cree un archivo.')
            // ACTUALIZAR
            await fs.promises.appendFile(promisesPath, ' Agrego nuevo contenido')
            // LEER
            const newContent = await fs.promises.readFile(promisesPath, 'utf-8')
            console.log(newContent)
            // ELIMINAR
            await fs.promises.unlink(promisesPath)

        } catch (error) {
            console.log(error)
        }
        
    }
    context()

        
    
    // ACTIVIDAD
    const fecha = new Date().toLocaleDateString()
    const hora = new Date().toLocaleTimeString()
    const path = './apunte/actividad.txt'
    const obj = {
        fecha: fecha,
        hora: hora
    }
       
    fs.writeFileSync(path, JSON.stringify(obj))
    const info = JSON.parse(fs.readFileSync(path, 'utf-8'))
    console.log(typeof info, )
    fs.unlinkSync(path)
    
    

