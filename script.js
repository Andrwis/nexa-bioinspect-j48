function evaluarHongo() {
    let odor = document.getElementById("odor").value;
    let sporeColor = document.getElementById("spore-color").value;
    let resultDiv = document.getElementById("result");

    resultDiv.style.display = "block";

    // Regla de decisión simplificada basada en el árbol J48 del dataset de hongos
    if (odor === "f" || odor === "y" || odor === "s" || odor === "p" || odor === "c" || odor === "m") {
        resultDiv.className = "poisonous";
        resultDiv.innerHTML = "🔴 ALERTA CRÍTICA: El espécimen es VENENOSO (Rule: Odor crítico detectado).";
    } else if (odor === "n") {
        // Si el olor es ninguno (none), evaluamos el color de espora como secundario
        if (sporeColor === "r" || sporeColor === "w") {
            resultDiv.className = "poisonous";
            resultDiv.innerHTML = "🔴 ALERTA CRÍTICA: El espécimen es VENENOSO (Rule: Odor neutro + Color de espora de riesgo).";
        } else {
            resultDiv.className = "edible";
            resultDiv.innerHTML = "🟢 ZONA SEGURA: El espécimen es COMESTIBLE.";
        }
    } else {
        resultDiv.className = "edible";
        resultDiv.innerHTML = "🟢 ZONA SEGURA: El espécimen es COMESTIBLE.";
    }
}
