let copiasBcr;
let copiasAbl;
let factor;

function ratio(bcr, abl) {
    let resultado = bcr / abl * 100;
    return resultado;
}


function correcion(relacionNaive, fc) {
    let resultado = relacionNaive * fc;
    return resultado;
}

function calcularRapido () {
    copiasBcr = parseInt(document.getElementById("copiasBCR-rapido").value)
    copiasAbl = parseInt(document.getElementById("copiasABL-rapido").value)
    factor = parseFloat(document.getElementById("factor-rapido").value)
    let relacion= ratio(copiasBcr, copiasAbl)
    let ratioCorregido = correccion (relacion, factor)
        
    if ( isNaN(factor) || factor === 0){
        let resultadoTexto = document.getElementById("resultado-rapido")
        resultadoTexto.innerText = "Relacion BCR::ABL/ABL % = "+relacion.toFixed(4)
        let notaResultadoTexto = document.getElementById("no-posee-factor")
        notaResultadoTexto.innerText = "Usted no ingreso un factor de correción"
    } else {
        let resultadoTexto = document.getElementById("resultado-rapido")
        resultadoTexto.innerText = "Relación BCR::ABL/ABL % corregido = "+ratioCorregido.toFixed(4)
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
    let cargaFactor = document.getElementById("factor").value
    const paciente = new Paciente (cargaNombre, cargaNumero, cargaFecha, cargaMuestra, cargaBcr, cargaAbl, cargaFactor)
    pacientes.push(paciente)
    console.log(paciente)

    let relacion = ratio(cargaBcr, cargaAbl)
    console.log(relacion)

    let pacienteIngresado = document.getElementById("paciente-container")

    let nuevoPaciente = document.createElement("p");
    nuevoPaciente.innerHTML =`<p> Nombre: ${paciente.nombre} </p> <p>Numero de muestra: ${paciente.numero}</p>` //Mucho cuidado con las comillas aca!!!
    document.body.appendChild(nuevoPaciente)
}

let botonCargaCalculo = document.getElementById("btn-calcular")
botonCargaCalculo.addEventListener("click", cargarPaciente)