let pacienteStorage = localStorage.getItem("PacienteCargado")
pacienteStorage = JSON.parse(pacienteStorage)
console.log(pacienteStorage)

let resultadosHistoricosCards = document.getElementById("card-container-resultados")

pacienteStorage.forEach((paciente) => {
    let card = document.createElement("div")
    card.className="resultado-historico-card"
    card.innerHTML=`<p>Paciente: ${paciente.nombre}</p>
                    `
    resultadosHistoricosCards.appendChild(card)
});

function borrarHistorico (){
    localStorage.removeItem("PacienteCargado")
    location.reload() //para que recargue la pagina y se vea limpio
}

let botonBorrarHistorico = document.getElementById("btn-borrar-historico")
botonBorrarHistorico.addEventListener("click", borrarHistorico)

