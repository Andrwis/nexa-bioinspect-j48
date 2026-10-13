function evaluarHongo() {
    let odor = document.getElementById("odor").value;
    let sporeColor = document.getElementById("spore-color").value;
    let capShape = document.getElementById("cap-shape").value;
    let habitat = document.getElementById("habitat").value;
    let gillSize = document.getElementById("gill-size").value;
    let resultDiv = document.getElementById("result");

    resultDiv.style.display = "block";

    // Simulación extendida del árbol J48 con reglas de decisión del dataset de hongos
    if (odor === "f" || odor === "y" || odor === "s" || odor === "p" || odor === "c" || odor === "m") {
        resultDiv.className = "poisonous";
        resultDiv.innerHTML = "🔴 ALERTA CRÍTICA: El espécimen es VENENOSO.<br><small style='font-weight:normal; display:block; margin-top:5px;'>Regla J48: Presencia de perfil olfativo tóxico dominante.</small>";
    } else if (odor === "n") {
        // Evaluadores secundarios cuando el olor es neutro
        if (sporeColor === "r" || sporeColor === "w") {
            resultDiv.className = "poisonous";
            resultDiv.innerHTML = "🔴 ALERTA CRÍTICA: El espécimen es VENENOSO.<br><small style='font-weight:normal; display:block; margin-top:5px;'>Regla J48: Olor neutro combinado con color de espora de alto riesgo.</small>";
        } else if (habitat === "g" && capShape === "x") {
            resultDiv.className = "poisonous";
            resultDiv.innerHTML = "🔴 ALERTA CRÍTICA: El espécimen es VENENOSO.<br><small style='font-weight:normal; display:block; margin-top:5px;'>Regla J48: Coincidencia en hábitat y morfología convexa peligrosa.</small>";
        } else {
            resultDiv.className = "edible";
            resultDiv.innerHTML = "🟢 ZONA SEGURA: El espécimen es COMESTIBLE.<br><small style='font-weight:normal; display:block; margin-top:5px;'>Regla J48: Cumple con los umbrales seguros del modelo.</small>";
        }
    } else {
        resultDiv.className = "edible";
        resultDiv.innerHTML = "🟢 ZONA SEGURA: El espécimen es COMESTIBLE.<br><small style='font-weight:normal; display:block; margin-top:5px;'>Regla J48: Olor benigno (almendra/anís) validado como seguro.</small>";
    }
}
