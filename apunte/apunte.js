// Terminos a investigar
/*
    • Desarrollo hexagonal
    •AWS
    •Microservicios 
CLASE 3:
    •Concepto merge en lo que es el spread.
    •REGEX
    •DYNAMIC IMPORT (SIGUIENTES CLASES)
    •VARIABLES PRIVADAS DENTRO DE LAS CLASES
*/

// Shortcuts
/*
    1)  node \nombreDeMiArchivo.js => Comando para correr el archivo en la consola ( \ = alt + 92 )
    con la tecla TAB te hace el comando de manera mas rapida. Tambien si en consola tocamos flecha para arriba te vuelve a escribir el ultimo comando
    2)  

*/
// Clase 0 NIVELACION
/*
const texto= (text)=>{
    console.log(text)
}

texto("hola")


node \nombreDeMiArchivo.js => Comando para correr el archivo en la consola ( \ = alt + 92 )
con la tecla TAB te hace el comando de manera mas rapida. Tambien si en consola tocamos flecha para arriba te vuelve a escribir el ultimo comando 
 

REPASO CONCEPTUAL JS

Booleanos: True es equivalente a 1 y False es equivalente a 0, por lo cual si hago true + 1 esto va a ser igual 2

*/

// Clase 1 PRINCIPIOS BASICOS JS
/*
Variable = Espacio de memoria apartado por la computadora para pdoer guardar un dato.
Var tenia scope global. Y si habia archivos distintos con una variable con el mismo nombre crasheaba todo. De ahi que aparecio let y const.
Probar el  navegador BRAVE

Mutabilidad: let y const.
    EJEMPLOS

    1)
        let a = "Mauro"

        a= "Carlos"

        SE PUEDE
        
    2)
        const b = "Juan"

        b = "Pedro"

        NO SE PUEDE

        const c = {
            nombre : "Mau",
            edad: 26
        }

    3)
        c.edad=27
        SE PUEDE
        Acá ocupa el mismo espacio de memoria. Lo estoy mutando. Es un cambio interno. Cambió el valor de una propiedad, el espacio dedicado en la memoria sigue siendo el mismo.

        Tambien se puede agregar nueva propiedad.
        c.estatura = 1.70


        c = {
            nombre: "Mau",
            edad: 27
        }

        NO SE PUEDE.
        En este caso estoy REASIGNANDO. Estoy creando otro mau aunque sea similar al objeto anterior.

        Para hacer un objeto constante inmutable se hace así:

        Object.freeze(c)

        Esto se hace principalmente cuando trabajamos con DICCIONARIOS y ENUMERADORES
        EJ diccionario: 
        {Argentina: "AR",
        Brasil: "BR",
        Mexico "MX"}

        Tambien se puede freezar un Array ya que es un objeto

Funciones

    Si tengo:
    const x = 1

    const 1Ejemplo = ()=>{
        const x = 2
        console.log(x)
    }

    1Ejemplo() => Esto muestra 2.

    Primero busca la variable dentro del scope local, sino la encuentra entonces busca afuera en la global.
    Adentro de la funcion también puedo reasignar





    primero busca la variable dentro del scope, sino la encuentra busca afuera en la global

    Diferencias entre arrow function y funciones normales: 

Comillas, back tics y comillas simples
    const saludo = ()=>{
        console.log(`hola
            aa`)
    }
    Aca entiende el salto de linea, te lee el enter
    ctrl + alt + cerrado de llaves

    Tambien se puede INTERPOLAR (meter una variable en el texto)
    let nombre = "Carlos" 
    console.log(`hola ${nombre}`)

CLASES    
    class Persona {
        constructor (nombre, apellido, edad){ 
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.amigos = []; //Aca no es necesario pasar amigos como argumento: porque tal vez para crear una persona quiero que no tenga amigos.
            // El this hace referencia al objeto Persona.
        } //Se ejecuta al crear una nueva persona.
        saludar = () =>{
            console.log(`Hola, soy ${this.nombre}`)
        }  
    }
    // Los nombre de las clases empezarlos con mayuscula. Hacemos una clase en cuanto se empiecen a repetir cosas:

    const persona1 = new Persona("Mauri", "Espinosa", 26)




// HANDS ON LAB : Hacer una clase contador

    class Contador {
        constructor (responsable){
            this.responsable = responsable;
            this.conteo = 0; //No lo mando como argumento ya que todos van a empezar en 0    
        }
        static conteoGlobal = 0; 
        // Si seteamos en 0 el conteo global, cuando se cree un nuevo objeto,
        //como obtendría el conteo general si lo setee en 0? 
        // Static lo crea 1 vez en 0 y despues pasa el valor a cada creacion del objeto

        getResponsable = ()=>{
            return this.responsable
        }
        contar = ()=>{
            this.conteo++;
            Contador.conteoGlobal++; //No lo puedo llamar con this porque no es propio de una instancia del objeto, sino del objeto en si. Por eso lo hago con la clase misma.
        }
        getCuentaIndividual = ()=>{
            return this.conteo;
        }
        getCuentaGlobal = ()=>{
            return Contador.conteoGlobal;
        }

    }

    const contador1 = new Contador("Carlos")
    const contador2 = new Contador("Juan")
    const contador3 = new Contador("Maria")

    contador1.contar()
    contador2.contar()
    console.log(contador1.getCuentaIndividual())
    console.log(contador3.getCuentaGlobal())

*/

/*
CLASE 2 NUEVAS FUNCIONALIDADES ECMA SCRIPT
// EXPONENCIAL: **

    let valoresBase = [1,2,3,4,5,6];
    let nuevosValores = valoresBase.map((a, b)=>a**b);
    console.log(nuevosValores);

// ARRAY.INCLUDES: devuelve true/false

    let nombres = ["juan", "camilo", "ana", "pedro"];
    console.log(nombres.includes("Camilo"))
    console.log(nombres.includes("camilo"))

// ASYNC/AWAIT (Clase 4)

//OBJETO Object Y SUS METODOS

    const miObjeto = {
        nombre: "sebastian",
        apellido: "sonenblum",
        edad: 24
    }
    console.log(Object.keys(miObjeto)) //Devuelve un array con las keys, por lo cual:
    console.log(Object.keys(miObjeto)[0]) //Puedo seleccionar. O usar includes tambien:
    console.log(Object.keys(miObjeto).includes("nombre"))//Va a dar true
    console.log(Object.values(miObjeto)) //Devuelve un array con los values
    console.log(Object.entries(miObjeto))//Te da un array de arreglos en sus conjuntos [[key1, value], [key2,value], etc]

// FINALLY (Clase 4)

//ES9
// SPREAD y REST OPERATORS

    const objetoA = {
        peras: 1,
        manzanas: 1,
        bananas: 2,
        fresas: 4
    }
    const objetoB = {
        duraznos: 2,
        uvas: 4,
        ciruelas: 6,
        fresas: 6
    }
    const objetoC = {
        ...objetoA, //Este es el spread: toma los valores y los vacia donde los quiero guardar (este es el vocabulario)
        ...objetoB
    }   // Te mezcla las keys y values al mismo nivel si hay anidacion?
        // Sobrescribe valores segun orden de aparicion. 
        // Investigar el concepto "merge"
    console.log(objetoC)
    // Maneras de acceder a las propiedades:
    const peras = objetoA.peras;
    const manzanas = objetoA.manzanas;
    const bananas =objetoA['bananas'];
    // Desestructuracion (los corchetes) y rest operator (combinacion de spread y destructuring)
        const {duraznos, uvas, ...frutasRestantes} = objetoB 
        // En este caso frutas restantes es un objeto en sí mismo. Es el resto del objeto que quedó sin sacar
    console.log(duraznos, uvas, frutasRestantes)
    console.log(objetoB) //No modifica al objeto original todas las operaciones anteriores.
    // DUDA:
    // Creo que vale señalar que la destructuracion es en orden en el que se encuentran adentro del objeto,
    // por si queres cierto elemento que esta atrás de otro tenes que dejar un espacio en blanco

    


// Actividad: 
// Tengo un array de objetos. Crear un array con las claves de los objetos, sin que estas se repitan.
// Despues obtener el total de productos vendidos por todos los objetos (usar object.values) PENDIENTE ESTA ULTIMA CONSIGNA
const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carnes: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 1
    }
]
const nuevoArray = []
objetos.forEach(objeto=>{
    let keys = Object.keys(objeto)
    keys.forEach(key=>{
        if(!nuevoArray.includes(key))nuevoArray.push(key)
    })
})
console.log(nuevoArray)

// ES10
// .TRIM: METODO DE STRING
// .FLAT: Metodo de array para poner en un mismo nivel arrays anidadas. Justamente las achata.
// DYNAMIC IMPORT (SIGUIENTES CLASES)
// ES11
// OPERADOR NULLISH
    // ¿que es un FALSEY? Valores que la PC toma por falsos, aunque no sean un bool, XEJ:
        •0 == false
        •null == false
        •NaN 
        •Undefined 
        •"" (string vacio) 
    
        const baños = 0
    //Como 0 es false no lo va a tomar y la variable va a valer "sin definir":
    const numBaños = 0 || "sin definir" 
    console.log(numBaños) 
    // El "??" ignora los falseys y tomar como falso undefined y null:
    const numBañosOK = 00 ?? "sin definir"
    console.log(numBañosOK) 
        // NaN te lo toma como opcion posible

// HANDS ON LAB (PENDIENTE PARA EL AFTER)
    class TicketManager {
        //Variable privada: para evitar que desde consola puedas acceder a esta:
        #precioBaseDeGanancia = 1.15;
        constructor(){
            this.eventos = [];
        }
        getEventos = () =>{
            return this.eventos;
        }
        agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) =>{ //Sobre el de capacidad: si no me pasan nada es 50
            const evento ={
                nombre: nombre,
                lugar: lugar,
                precio: precio*this.#precioBaseDeGanancia,
                capacidad: capacidad,
                fecha: fecha,
                participantes: []
            }
            if (this.eventos.length===0){
                evento.id=1
            }else{
                evento.id = this.eventos[this.eventos.length-1].id+1
            }
            this.eventos.push(evento)
        }
    }
*/

/*
CLASE 3: PROGRAMACION SINCRONICA Y ASINCRONICA
    Callbacks
        
    Promesas
    Async/Await
DUDAS
    Que significa que una funcion sea reasignable?
    Que es el prototipo de un objeto/array?
        Significa que entra a la escencia del objeto
    Ejemplo diapo 43: Escribir un archivo es una funcion? Que es eso del require?
    console.log("hola")
    const promesa = new Promise((res,rej)=>{
        if (!rej){
            rej("REJECT")
        }else{
            res("RESOLVE")
        }
    })
    .then(result=> console.log(result))
    .catch(result=>console.log(result))

    const botonHola = document.getElementById("btn-hola")
    console.log(typeof botonHola)
*/


// ENTREGABLE
// Crear una clase que sea ProductManager (similar al hands of lab)
// Desde el constructor generar un arreglo vacio llamado "products"
// const producto = {
//     title: "",
//     description: "",
//     price: 0,
//     thumbnail: "url",
//     code: "id?",
//     stock: 0

// }
// .addProduct. Dos validaciones: que no se repita el id, y que todos los campos son obligatorios. EL ID se genera cuando se crea (id autoincrementable)
// .getProducts: que te devuelva todos los products
// .getProductsById = (id)=>{
    // Pasar el id y que me encuentre el prod. Usar FIND
// }

// CLASE 4
// Construccion de prototipo.
    /*
    Array.prototype.logicaDelMap = function (callback){
        let nuevoArray = []
        for (let i=0; i<this.length; i++){ //Como no tengo array de referencia pongo this, porque es del prototipo
            let nuevoValor = callback(this[i])
            nuevoArray.push(nuevoValor)
        }
        return nuevoArray
    }

    const miArray = [1,2,3,4,5]
    const multiplicarPorDos = valor=> valor*2 
    console.log(miArray.logicaDelMap(multiplicarPorDos))
    
        Sobre la funcion anonima y el uso de this
        Es decir, podemos declarar funciones anónimas en JavaScript con arrow function, un modo de escritura que siempre es anónimo:

        ( ) => { }

        O con la palabra clave function:

        function ( ) { }

        Como mencionamos antes, estas dos maneras de escribir funciones anónimas en JavaScript implican dos aproximaciones diferentes al entendimiento de this.

        En la función anónima de tipo arrow function, la palabra clave this toma el valor del scope superior. Por su parte, en la función anónima de tipo function, el valor pertenece a quien ejecuta esta función. Por esto es muy importante reconocer las distintas maneras de escribir funciones anónimas en JavaScript, pues tu código puede tener resultados muy diferentes según como determines la función.
    */        
// CALLBACKS
    // CONVENVIONES:
    
        
        // • Se pasa como ultimo parametro en la funcion
        // •Suele recibir dos parametros
        // •La funcion debe llamar al callback al terminar de ejecutar todas sus operaciones (?)
        // •Un callback puede fallar, entonces se toman en cuenta dos posibles casos: cuando falla de manera interna, o si se resuelve de manera correcta
        //  EJ: 
            /*
            const callbackAvanzado = (error, valor)=>{
                if(error){
                    // Controlar el error
                }
                if(valor){
                    // Salio todo bien
                    return valor
                }
            }
            // Siempre se usan dos parametros para que te devuelva y poder usar por fuera
            //  Si algo sale mal te arroja un error,
        */
    // ANIDACION Y PROBLEMAS. 37:31 DEL ZOOM


/*
CLASE 5: MANEJO DE ARCHIVOS
FS (file system)=> es un modulo que cuando instalas node se te instala que es para el manejo de archivos y conectar
 
COSAS A INVESTIGAR:
UTF-8 Y DISTINTOS TIPOS DE CODIFICACION
DISTINTOS TIPO DE FS.WRITE. Que tipo de dato es?



const fs = require ('fs')  //Que se necesite el modulo interno FS


// FS SÍNCRONO
    fs.writeFileSync('./apunte/rutaDelArchivo.txt', "Con esta funcion creo un archivo que diga esto en el path que mencioné anteriormente.")
        // Se pueden investigar los otros tipos de .write()
        //  /. => Esto es path relativo: te va a crear desde el arranque del proyecto
        //Si yo lo ejecuto se crea un archivo. Si lo ejecuto y el archivo ya existe pisas el contenido. Existen métodos mas eficientes.
        //Sirve para visualizacion rápida de cosas, o guardado simple de datos (?)

    fs.appendFileSync('./apunte/rutaDelArchivo.txt', "\nEsto es el append de texto al archivo txt que cree")

    //Solo puedo escribir strings ya que un archivo en el fondo es un archivo de texto. No puedo guardar un objeto, o un array.

    //Guardar otro tipo de datos.

        const productos = [
            {
                precio: 1500,
                stock: 2
            }
        ]
        fs.writeFileSync('./apunte/productos.json', JSON.stringify(productos))//Creo un JSON en formato string

    // Ahora a acceder y hacer lectura
        const datosJSON = fs.readFileSync('./apunte/productos.json', 'utf-8') //UTF-8 es el codigo en el que leo el contenido de un archivo. INVESTIGAR
        // console.log(datosJSON, typeof datosJSON) //En este console log el typeof es string

        const datosJSONParseo = JSON.parse(datosJSON)
        // console.log(datosJSONParseo, typeof datosJSONParseo) //Ahora si tengo el objeto en typeof object

    //Eliminar
        fs.unlinkSync('./apunte/productos.json')
        fs.unlinkSync('./apunte/rutaDelArchivo.txt')

    //Existe un archivo?
        console.log(fs.existsSync('./apunte/productos.json')) //Devuelve false. Ya que los eliminé


// FS CON CALLBACKS
    //Escribir un archivo
        //Tengo que pasar: ruta, contenido, callback
    fs.writeFile('./productoCallback.json', JSON.stringify(productos), (error)=>{
        if (error){
            console.log(error)
            return //es una forma de break
        }
        console.log("Archivo creado con exito")
    })
    //Leer
        fs.readFile('./productoCallback.json', 'utf-8', (error, content)=>{
            if(error){
                console.log(error)
            }
            // PROBLEMA !!!
            //Si quiero escribir el archivo entro en un callback hell porque necesito saber que esta ahi para poder escribirlo y despues guardar y despues leer. (Reveer la clase aca, no entendi porque se crear el ccallback hell)
        })


//ACTIVIDAD
        //No se cual es la actividad pero estaba bueno que el profe cargaba datos a un archivo en este formato.
    // const hoy = new Date()
    // fs.writeFile('./desafio.txt', `Fecha: ${hoy}`, (error)=>{//BACK TICS => ALT GR + cierre corchete("}")
    //     if (error){
    //         console.log(error)
    //         return
    //     }
    //     fs.readFile('./desafio.txt', 'utf-8', (error, content)=>{
    //         if (error){
    //             console.log(error)
    //             return
    //         }
    //         console.log(content)
    //     })
    // }) 


//FS CON PROMESAS
    //El require ya no se usa,
    //Aca va otra forma de import: 
    //Vamos a la terminal: NPM init -y (-y = yes a todas las opciones). SI no hay un index.js va a tomar el primer archivo que encuentre como entrypoint
    //Esto crea un paquete: osea estas indicando que estas trabajando sobre un proyecto.
    //Tambien NPM init. Te hace unas preguntas sobre la creacion del paquete
    // Despues de crear un paquete hay que agregar en el package.json: "type": "module"
    //Para importarlo se usa asi:
    // import fs from 'fs'

// ACTIVIDAD 2

// Hands on lab

*/






/*
CLASE 6(?)
// Actividad de clase
// Crear un proyecto que genere 10000 numeros aleatorios de 1 a 20. Crear keys con el numero. Y el valor va a ser la cantidad de veces que salio
NO CORRER ESTE CODIGO=>

const randomSet = {
}
for (let i = 0; 0<10000; i++){
    let number = Math.floor(Math.random()*20+1) //Se pone el +1 porque es el minimo.
    if (!randomSet[number]){
        randomSet[number] = 1
    }else{
        randomSet[number]++
    }   
}
*/

