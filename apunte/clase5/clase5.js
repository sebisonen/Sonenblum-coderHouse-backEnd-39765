// ACTIVIDAD EN CLASE
// Generar 10000 numeros aleatorios en un rango de 1 a 20.
// Sus keys son los numeros que salieron y el valor la cantidad de veces que salio


const setOfNumbers = {
}
for (let index = 0; index<10000; index++) {
    const number = Math.floor(Math.random()*20+1)
    setOfNumbers[number]?
        setOfNumbers[number]++:
        setOfNumbers[number]=1

}
console.log(setOfNumbers)

