let copiasBcr;
let copiasAbl;
let factor;
let respuestas = []

// carga del archivo json

fetch("./db/data.json")
    .then(response =>response.json())
    .then(data => {
        respuestas = data; // Asignar los datos cargados al array `respuestas`
        console.log('Datos cargados:', respuestas); // Verificar que los datos del json se cargaron correctamente
    })

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
        respuestaMolecularTexto.innerText = "Respuesta molecular: "+ busqueda.molecular

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
//le agregue que el array tenga ya objetos del local storage, si no ahi arranca vacio []
const pacientes = JSON.parse(localStorage.getItem("PacienteCargado")) || []

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
    
    //storage paciente
    localStorage.setItem("PacienteCargado", JSON.stringify(pacientes))
    let nuevoPaciente = document.createElement("div");
        if ( isNaN(cargaFactor) || cargaFactor === 0){
            let busqueda = filtradoAbl.find(rta => rta.limiteSup >= relacion)
            console.log(busqueda.molecular)
            nuevoPaciente.innerHTML =`<div class="paciente-card"><p> Nombre: ${paciente.nombre} </p> 
                            <p>Numero de muestra: ${paciente.numero}</p> 
                            <p>Fecha: ${paciente.fecha}</p>
                            <p>Tipo de muestra: ${paciente.muestra}</p>
                            <p>Copias de ABL: ${cargaAbl} copias</p>
                            <p> BCR::ABL: ${relacion.toFixed(4)}% </p>
                            <p> Respuesta molecular: ${busqueda.molecular}</p></div>` //Mucho cuidado con las comillas aca!!!
            let seccionResultadosDetallados = document.querySelector(".pacientes-container");
            seccionResultadosDetallados.appendChild(nuevoPaciente);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Se calculó correctamente! Añadido a Lista de Resultados",
                showConfirmButton: false,
                timer: 1500
              });
        } else {
            let busqueda = filtradoAbl.find(rta => rta.limiteSup >= ratioCorregido)
            console.log(busqueda.molecular)
            nuevoPaciente.innerHTML =`<div class="paciente-card"><p> Nombre: ${paciente.nombre} </p> 
                            <p>Numero de muestra: ${paciente.numero}</p> 
                            <p>Fecha: ${paciente.fecha}</p>
                            <p>Tipo de muestra: ${paciente.muestra}</p>
                            <p>Copias de ABL: ${cargaAbl} copias</p>
                            <p> BCR::ABL corregido: ${ratioCorregido.toFixed(4)}% </p>
                            <p> Respuesta molecular: ${busqueda.molecular}</p></div>` //Mucho cuidado con las comillas aca de nuevo!!!
            let seccionResultadosDetallados = document.querySelector(".pacientes-container");
            seccionResultadosDetallados.appendChild(nuevoPaciente);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Se calculó correctamente! Añadido a Lista de Resultados",
                showConfirmButton: false,
                timer: 1500
              });
        }
        
        
}

let botonCargaCalculo = document.getElementById("btn-calcular")
botonCargaCalculo.addEventListener("click", cargarPaciente)



