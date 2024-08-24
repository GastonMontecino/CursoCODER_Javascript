let pacienteStorage = localStorage.getItem("PacienteCargado")
pacienteStorage = JSON.parse(pacienteStorage)
console.log(pacienteStorage)

let resultadosHistoricosCards = document.getElementById("card-container-resultados")

pacienteStorage.forEach((paciente) => {
    let card = document.createElement("div")
    card.className="resultado-historico-card"
    card.innerHTML=`<p>Paciente: ${paciente.nombre}</p>
                    <p>Numero: ${paciente.numero}</p>
                    <p>Fecha: ${paciente.fecha}</p>
                    `
    resultadosHistoricosCards.appendChild(card)
});

function borrarHistorico (){
    Swal.fire({
        title: "¿Seguro que quiere borrar el histórico? No se puede deshacer",
        showDenyButton: true,
        confirmButtonText: "Limpiar Histórico",
        denyButtonText: `Cancelar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.removeItem("PacienteCargado")
            location.reload() //para que recargue la pagina y se vea limpio
          Swal.fire("Historico Borrado", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Acción cancelada", "", "info");
        }
      });

}

let botonBorrarHistorico = document.getElementById("btn-borrar-historico")
botonBorrarHistorico.addEventListener("click", borrarHistorico)

