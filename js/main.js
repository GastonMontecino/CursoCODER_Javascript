let copiasBcr;
let copiasAbl;
let factor;

function ratio(bcr, abl) {
    let resultado = bcr / abl * 100;
    return resultado;
}


function correccion(relacionNaive, fc) {
    let resultado = relacionNaive * fc;
    return resultado;
}

function calcularRapido () {
    copiasBcr = parseInt(document.getElementById("copiasBCR-rapido").value)
    copiasAbl = parseInt(document.getElementById("copiasABL-rapido").value)
    factor = parseFloat(document.getElementById("factor-rapido").value)
    let relacion= ratio(copiasBcr, copiasAbl)
    let ratioCorregido = correccion (relacion, factor)
    
    let filtradoAbl = respuestas.filter(rta => rta.ablMin <= copiasAbl)
    console.log(filtradoAbl)

    if ( isNaN(factor) || factor === 0){
        let resultadoTexto = document.getElementById("resultado-rapido")
        resultadoTexto.innerText = "Relacion BCR::ABL/ABL % = "+relacion.toFixed(4)
        let notaResultadoTexto = document.getElementById("no-posee-factor")
        notaResultadoTexto.innerText = "Usted no ingreso un factor de correción"

        let busqueda = filtradoAbl.find(rta => rta.limiteSup >= relacion)
        console.log(busqueda.molecular)

        let respuestaMolecularTexto = document.getElementById("respuesta-molecular")
        respuestaMolecularTexto.innerText = "Respuesta molecular "+ busqueda.molecular

    } else {
        let resultadoTexto = document.getElementById("resultado-rapido")
        resultadoTexto.innerText = "Relación BCR::ABL/ABL % corregido = "+ratioCorregido.toFixed(4)
        let busqueda = filtradoAbl.find(rta => rta.limiteSup >= ratioCorregido)
        console.log(busqueda.molecular)

        let respuestaMolecularTexto = document.getElementById("respuesta-molecular")
        respuestaMolecularTexto.innerText = "Respuesta molecular "+ busqueda.molecular

    }
    
    }

let botonCalculoRapido = document.getElementById("btn-calcular-rapido")
botonCalculoRapido.addEventListener('click', calcularRapido) //Falta que lo haga con Enter tambien

class Paciente{
    constructor (nombre, numero, fecha, muestra){
        this.nombre = nombre,
        this.numero = numero,
        this.fecha = fecha,
        this.muestra = muestra
    }
}

const pacientes = []

function cargarPaciente(){
    let cargaNombre = document.getElementById("nombre").value
    let cargaNumero = document.getElementById("numero").value
    let cargaFecha = document.getElementById("fecha").value
    let cargaMuestra = document.getElementById("muestra").value
    let cargaBcr = parseInt(document.getElementById("copiasBCR").value)
    let cargaAbl = parseInt(document.getElementById("copiasABL").value)
    let cargaFactor = parseFloat(document.getElementById("factor").value)
    const paciente = new Paciente (cargaNombre, cargaNumero, cargaFecha, cargaMuestra, cargaBcr, cargaAbl, cargaFactor)
    pacientes.push(paciente)
    console.log(paciente)

    let relacion = ratio(cargaBcr, cargaAbl)
    console.log(relacion)

    let ratioCorregido = correccion (relacion, cargaFactor)
    console.log(ratioCorregido)

    let filtradoAbl = respuestas.filter(rta => rta.ablMin <= cargaAbl)
    console.log(filtradoAbl)
    
    let pacienteIngresado = document.getElementById("paciente-container")

    let nuevoPaciente = document.createElement("p");
        if ( isNaN(cargaFactor) || cargaFactor === 0){
            let busqueda = filtradoAbl.find(rta => rta.limiteSup >= relacion)
            console.log(busqueda.molecular)
            nuevoPaciente.innerHTML =`<p id="prueba"> Nombre: ${paciente.nombre} </p> 
                            <p>Numero de muestra: ${paciente.numero}</p> 
                            <p>Fecha: ${paciente.fecha}</p>
                            <p>Tipo de muestra: ${paciente.muestra}</p>
                            <p>Copias de ABL: ${cargaAbl} copias</p>
                            <p> BCR::ABL: ${relacion.toFixed(4)}% </p>
                            <p> Respuesta molecular: ${busqueda.molecular}</p>` //Mucho cuidado con las comillas aca!!!
        document.body.appendChild(nuevoPaciente)
        } else {
            let busqueda = filtradoAbl.find(rta => rta.limiteSup >= ratioCorregido)
            console.log(busqueda.molecular)
            nuevoPaciente.innerHTML =`<p> Nombre: ${paciente.nombre} </p> 
                            <p>Numero de muestra: ${paciente.numero}</p> 
                            <p>Fecha: ${paciente.fecha}</p>
                            <p>Tipo de muestra: ${paciente.muestra}</p>
                            <p>Copias de ABL: ${cargaAbl} copias</p>
                            <p> BCR::ABL corregido: ${ratioCorregido.toFixed(4)}% </p>
                            <p> Respuesta molecular: ${busqueda.molecular}</p>` //Mucho cuidado con las comillas aca de nuevo!!!
        document.body.appendChild(nuevoPaciente)
        }

}

let botonCargaCalculo = document.getElementById("btn-calcular")
botonCargaCalculo.addEventListener("click", cargarPaciente)



const rta1 = {
    molecular: "RM 5.0",
    reduccionLogaritmica: ">= 5.0 log",
    limiteInf: 0,
    limiteSup: 0.001,
    abl: 100000
}

const rta2 = {
    molecular: "RM 4.5",
    reduccionLogaritmica: ">= 4.5 log",
    limiteInf: 0,
    limiteSup: 0.0032,
    ablMin: 32000
}

const rta3 = {
    molecular: "RM 4.0",
    reduccionLogaritmica: ">= 4.0 log",
    limiteInf: 0,
    limiteSup: 0.01,
    ablMin: 10000
}

const rta4 = {
    molecular: "RM Mayor",
    reduccionLogaritmica: ">= 3.0 log",
    limiteInf: 0.01,
    limiteSup: 0.1,
    ablMin: 0
}
const rta5 = {
    molecular: "RM Menor",
    reduccionLogaritmica: ">= 2.0 log",
    limiteInf: 0.1,
    limiteSup: 1,
    ablMin: 0
}
const rta6 = {
    molecular: "RM Minima",
    reduccionLogaritmica: ">= 1.0 log",
    limiteInf: 1,
    limiteSup: 10,
    ablMin: 0
}
const rta7 = {
    molecular: "RM Nula",
    reduccionLogaritmica: "< 1.0 log",
    limiteInf: 10,
    limiteSup: Infinity,
    ablMin: 0
}

const respuestas = [rta1, rta2, rta3, rta4, rta5, rta6, rta7]

