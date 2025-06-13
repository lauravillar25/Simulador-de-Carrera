document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCarrera");
  const historialSeccion = document.getElementById("historial");
  const listaHistorial = document.getElementById("listaHistorial");
  const verResultadosBtn = document.getElementById("verResultados");
  const modal = document.getElementById("modal");
  const modalResultados = document.getElementById("modalResultados");
  const cerrarModalBtn = document.getElementById("cerrarModal");

  const MAX_AVANCE = 5;
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  let ultimaCarrera = [];

  function guardarHistorial(carrera) {
    historial.push(carrera);
    localStorage.setItem("historial", JSON.stringify(historial));
  }

  function mostrarHistorial() {
    listaHistorial.innerHTML = "";
    historial.forEach((c, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${c.fecha} - Ganador: ${c.ganador}, Pasos: ${c.pasos}`;
      listaHistorial.appendChild(li);
    });
    if (historial.length > 0) {
      historialSeccion.classList.remove("oculto");
    }
  }

  function simularCarrera(nombres, longitud) {
    let corredores = nombres.map(nombre => ({ nombre: nombre.trim(), posicion: 0 }));
    let ganador = null;

    while (!ganador) {
      corredores.forEach(corredor => {
        corredor.posicion += Math.floor(Math.random() * MAX_AVANCE) + 1;
        if (corredor.posicion >= longitud && !ganador) {
          ganador = corredor.nombre;
        }
      });
    }

    return { ganador, corredores };
  }

  function mostrarResultados(corredores, longitud) {
    modalResultados.innerHTML = `
      <h3>Posiciones Finales</h3>
      <div>
        ${corredores
          .sort((a, b) => b.posicion - a.posicion)
          .map(c => `
            <div class="progress-bar" style="--progreso:${Math.min((c.posicion / longitud) * 100, 100)}%">
              <span class="progress-label">${c.nombre}: ${c.posicion} pasos</span>
            </div>`)
          .join("")}
      </div>
    `;
    modal.classList.remove("oculto"); 
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombresInput = document.getElementById("nombres").value;
    const longitudInput = parseInt(document.getElementById("longitud").value);
    const nombres = nombresInput.split(",").map(n => n.trim()).filter(n => n);

    if (nombres.length < 2) {
      alert("Debe ingresar al menos dos corredores.");
      return;
    }

    if (isNaN(longitudInput) || longitudInput <= 0) {
      alert("La longitud de la carrera debe ser un número positivo.");
      return;
    }

    const resultadoCarrera = simularCarrera(nombres, longitudInput);
    const { ganador, corredores } = resultadoCarrera;
    const fecha = new Date().toLocaleString();

    guardarHistorial({ fecha, ganador, corredores, pasos: longitudInput });
    ultimaCarrera = corredores;
    mostrarHistorial();
    mostrarResultados(corredores, longitudInput);
    verResultadosBtn.classList.remove("oculto");
  });

  verResultadosBtn.addEventListener("click", () => {
    if (ultimaCarrera.length > 0) {
      const longitudInput = parseInt(document.getElementById("longitud").value);
      mostrarResultados(ultimaCarrera, longitudInput);
    } else {
      alert("Debe simular una carrera primero.");
    }
  });

  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
  });

  mostrarHistorial();

  modal.classList.add("oculto"); 
});
