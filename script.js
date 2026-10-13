function evaluarModeloJ48() {
    let odor = document.getElementById("odor").value;
    let sporeColor = document.getElementById("spore-color").value;
    let capShape = document.getElementById("cap-shape").value;
    let habitat = document.getElementById("habitat").value;
    let gillSize = document.getElementById("gill-size").value;

    const panel = document.getElementById("result-panel");
    const card = document.getElementById("verdict-card");
    const title = document.getElementById("res-title");
    const ruleDesc = document.getElementById("res-rule");
    const badge = document.getElementById("res-badge");

    panel.style.display = "block";

    // Motor de reglas condicionales extraído del árbol J48
    // Nodo Raíz Primario: Olor (odor)
    if (odor === "f" || odor === "y" || odor === "s" || odor === "p" || odor === "c" || odor === "m") {
        card.className = "verdict-card poisonous-result";
        title.innerHTML = "🔴 ALERTA DE TOXICIDAD: ESPÉCIMEN VENENOSO";
        ruleDesc.innerHTML = "<strong>Regla J48 Activada:</strong> El nodo raíz identifica un perfil olfativo de alto riesgo (fétido, picante, pescado o similar). El modelo determina toxicidad con alta confianza.";
        badge.className = "badge poisonous-badge";
        badge.innerHTML = "Resultado: Venenoso (Poisonous)";
    } 
    else if (odor === "n") {
        // Ramificación secundaria cuando el olor es neutro
        if (sporeColor === "r" || sporeColor === "w") {
            card.className = "verdict-card poisonous-result";
            title.innerHTML = "🔴 ALERTA DE TOXICIDAD: ESPÉCIMEN VENENOSO";
            ruleDesc.innerHTML = "<strong>Regla J48 Activada:</strong> Aunque el olor es neutro, la combinación con el color de espora (blanco o verde) dispara una regla terminal de toxicidad.";
            badge.className = "badge poisonous-badge";
            badge.innerHTML = "Resultado: Venenoso (Poisonous)";
        } 
        else if (gillSize === "n" && capShape === "x") {
            card.className = "verdict-card poisonous-result";
            title.innerHTML = "🔴 ALERTA DE TOXICIDAD: ESPÉCIMEN VENENOSO";
            ruleDesc.innerHTML = "<strong>Regla J48 Activada:</strong> Coincidencia morfológica secundaria de branquias estrechas y sombrero convexo asociada a especies tóxicas en el árbol.";
            badge.className = "badge poisonous-badge";
            badge.innerHTML = "Resultado: Venenoso (Poisonous)";
        } 
        else {
            card.className = "verdict-card edible-result";
            title.innerHTML = "🟢 ZONA SEGURA: ESPÉCIMEN COMESTIBLE";
            ruleDesc.innerHTML = "<strong>Regla J48 Activada:</strong> Olor neutro combinado con parámetros morfológicos seguros dentro de los umbrales establecidos por el algoritmo.";
            badge.className = "badge edible-badge";
            badge.innerHTML = "Resultado: Comestible (Edible)";
        }
    } 
    else {
        // Olores benignos (Almendra 'a', Anís 'l')
        card.className = "verdict-card edible-result";
        title.innerHTML = "🟢 ZONA SEGURA: ESPÉCIMEN COMESTIBLE";
        ruleDesc.innerHTML = "<strong>Regla J48 Activada:</strong> El perfil olfativo presenta tonos benignos (almendra o anís), clasificados consistentemente como seguros por el árbol de decisión.";
        badge.className = "badge edible-badge";
        badge.innerHTML = "Resultado: Comestible (Edible)";
    }

    // Desplazamiento suave hacia el resultado
    panel.scrollIntoView({ behavior: 'smooth' });
}
