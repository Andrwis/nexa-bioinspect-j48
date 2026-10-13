function analizarEspecie(id, nombre, tipo, motivo, urlImagen) {
    const panel = document.getElementById("result-panel");
    const title = document.getElementById("res-title");
    const desc = document.getElementById("res-desc");
    const verdict = document.getElementById("res-verdict");

    panel.style.display = "block";
    title.innerHTML = `Análisis de Especie: <em>${nombre}</em>`;
    desc.innerHTML = `<strong>Fundamento Biológico / Regla J48:</strong> ${motivo}`;

    if (tipo === 'edible') {
        verdict.className = "verdict-box verdict-edible";
        verdict.innerHTML = "🟢 VEREDICTO MODELO J48: ESPÉCIMEN SEGURO (COMESTIBLE)";
    } else {
        verdict.className = "verdict-box verdict-poisonous";
        verdict.innerHTML = "🔴 VEREDICTO MODELO J48: ALERTA CRÍTICA (VENENOSO / TÓXICO)";
    }

    // Desplazamiento suave hacia el panel de resultados
    panel.scrollIntoView({ behavior: 'smooth' });
}
