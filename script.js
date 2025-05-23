const MAX_AVANCE = 5; 
let corredores = []; 
let longitudCarrera = 0; 


function obtenerCorredores() {
    corredores = []; 

    let cantidadCorredores = parseInt(prompt("Ingrese la cantidad de corredores (mínimo 2):"));

    while (isNaN(cantidadCorredores) || cantidadCorredores < 2) {
        cantidadCorredores = parseInt(prompt("Entrada inválida. Ingrese un número válido de corredores (2 o más):"));
    }

    for (let i = 1; i <= cantidadCorredores; i++) {
        let nombre = prompt(`Ingrese el nombre del corredor ${i}:`);
        corredores.push({ nombre: nombre, posicion: 0 });
    }

    console.log("Corredores inscritos:", corredores);
}


function obtenerLongitud() {
    longitudCarrera = parseInt(prompt("Ingrese la longitud de la carrera (en pasos):"));

    while (isNaN(longitudCarrera) || longitudCarrera <= 0) {
        longitudCarrera = parseInt(prompt("Entrada inválida. Ingrese un número positivo para la longitud de la carrera:"));
    }

    console.log("Longitud de la carrera:", longitudCarrera, "pasos");
}


function simularCarrera() {
    console.log("\n¡Comienza la carrera!");

    let ganador = null;

    while (!ganador) {
        console.clear(); 

        for (let i = 0; i < corredores.length; i++) {
            let avance = Math.floor(Math.random() * MAX_AVANCE) + 1;
            corredores[i].posicion += avance;

            const pistaVisible = 30;
            let progresoVisible = Math.min(corredores[i].posicion, pistaVisible);
            console.log(`${corredores[i].nombre}: ${"-".repeat(progresoVisible)}🏁`);

            if (corredores[i].posicion >= longitudCarrera) {
                ganador = corredores[i].nombre;
                break;
            }
        }

        if (!ganador) {
            console.log("\n--- Posiciones actuales ---");
            corredores.forEach(c => console.log(`${c.nombre}: ${c.posicion} pasos`));
            console.log("--- Siguiente turno ---\n");
        }
    }

    alert(`¡${ganador} ha ganado la carrera!`);
    console.log("\n🏆 ¡Resultados Finales! 🏆");

    corredores.sort((a, b) => b.posicion - a.posicion);

    for (let i = 0; i < corredores.length; i++) {
        console.log(`Posición ${i + 1}: ${corredores[i].nombre} - ${corredores[i].posicion} pasos`);
    }

    let mensajeFinal = "🏁 Resultados Finales:\n\n";
    for (let i = 0; i < corredores.length; i++) {
        mensajeFinal += `${i + 1}. ${corredores[i].nombre} - ${corredores[i].posicion} pasos\n`;
    }
    alert(mensajeFinal);
}


if (confirm("¿Desea iniciar una nueva carrera?")) {
    obtenerCorredores();   
    obtenerLongitud();      
    simularCarrera();       
} else {
    alert("Carrera cancelada.");
}
