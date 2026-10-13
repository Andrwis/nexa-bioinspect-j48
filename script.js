let decisionTreeModel = null;

window.addEventListener('DOMContentLoaded', async () => {
    try {
        let response = await fetch('model.json');
        decisionTreeModel = await response.json();
        console.log("Árbol J48 cargado correctamente desde model.json");
    } catch (error) {
        console.error("Error al cargar model.json:", error);
    }
});

function evaluarModeloJ48() {
    if (!decisionTreeModel) {
        alert("El modelo se está cargando, intenta de nuevo en un momento.");
        return;
    }

    // Capturar los valores del formulario
    let odor = document.getElementById("odor").value;
    let sporeColor = document.getElementById("spore-color").value;
    let gillSize = document.getElementById("gill-size") ? document.getElementById("gill-size").value : "b";
    let gillSpacing = document.getElementById("gill-spacing") ? document.getElementById("gill-spacing").value : "w";
    let population = document.getElementById("population") ? document.getElementById("population").value : "v";

    const panel = document.getElementById("result-panel");
    const card = document.getElementById("verdict-card");
    const title = document.getElementById("res-title");
    const ruleDesc = document.getElementById("res-rule");
    const badge = document.getElementById("res-badge");

    panel.style.display = "block";

    let currentNode = decisionTreeModel.rootNode;
    let decision = null;

    // 1. Evaluar primer nivel (odor)
    if (currentNode.branches && currentNode.branches[odor]) {
        let branch = currentNode.branches[odor];
        
        // Si tiene sub-atributos (ej: spore-print-color)
        if (branch.attribute === "spore-print-color") {
            if (branch.branches && branch.branches[sporeColor]) {
                let subBranch = branch.branches[sporeColor];
                
                // Si sigue bajando (ej: gill-size)
                if (subBranch.attribute === "gill-size") {
                    if (subBranch.branches && subBranch.branches[gillSize]) {
                        let deepBranch = subBranch.branches[gillSize];
                        
                        // Si sigue bajando (ej: gill-spacing)
                        if (deepBranch.attribute === "gill-spacing") {
                            if (deepBranch.branches && deepBranch.branches[gillSpacing]) {
                                let deeperBranch = deepBranch.branches[gillSpacing];
                                
                                // Si llega a population
                                if (deeperBranch.attribute === "population") {
                                    if (deeperBranch.branches && deeperBranch.branches[population]) {
                                        decision = deeperBranch.branches[population];
                                    } else {
                                        decision = deeperBranch.default || { result: "edible", rule: "Ruta por defecto" };
                                    }
                                } else {
                                    decision = deeperBranch;
                                }
                            } else {
                                decision = deepBranch.default || { result: "edible", rule: "Ruta por defecto" };
                            }
                        } else {
                            decision = deepBranch;
                        }
                    } else {
                        decision = subBranch.default || { result: "edible", rule: "Ruta por defecto" };
                    }
                } else {
                    decision = subBranch;
                }
            } else {
                decision = branch.default || { result: "edible", rule: "Ruta por defecto" };
            }
        } else {
            decision = branch;
        }
    } else {
        decision = currentNode.default || { result: "edible", rule: "Ruta por defecto" };
    }

    // Renderizar veredicto basado estrictamente en el JSON del árbol
    if (decision.result === "poisonous") {
        card.className = "verdict-card poisonous-result";
        title.innerHTML = "🔴 ALERTA DE TOXICIDAD: ESPÉCIMEN VENENOSO";
        ruleDesc.innerHTML = `<strong>Ruta exacta del Árbol J48:</strong> ${decision.rule}`;
        badge.className = "badge poisonous-badge";
        badge.innerHTML = "Resultado: Venenoso (Poisonous)";
    } else {
        card.className = "verdict-card edible-result";
        title.innerHTML = "🟢 ZONA SEGURA: ESPÉCIMEN COMESTIBLE";
        ruleDesc.innerHTML = `<strong>Ruta exacta del Árbol J48:</strong> ${decision.rule}`;
        badge.className = "badge edible-badge";
        badge.innerHTML = "Resultado: Comestible (Edible)";
    }

    panel.scrollIntoView({ behavior: 'smooth' });
}
