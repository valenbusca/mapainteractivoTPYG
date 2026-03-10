document.querySelectorAll('.materia').forEach(materia => {
    materia.addEventListener('mouseenter', () => {
        resetColors();
        materia.classList.add('selected');
        procesarCadena(materia.id, 'data-correlativas', 'previa');
        procesarCadena(materia.id, 'data-abre', 'siguiente');
    });
    materia.addEventListener('mouseleave', resetColors);
});

function procesarCadena(id, atributo, tipo) {
    const el = document.getElementById(id);
    if (!el) return;
    const relaciones = (el.getAttribute(atributo) || "").split(" ").filter(i => i);
    relaciones.forEach(rel => {
        const [modo, targetId] = rel.split(":"); 
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            const clase = (modo === 'F') ? `${tipo}-final` : `${tipo}-cursada`;
            if (!targetEl.classList.contains(`${tipo}-final`)) {
                targetEl.classList.add(clase);
            }
            procesarCadena(targetId, atributo, tipo);
        }
    });
}

function resetColors() {
    document.querySelectorAll('.materia').forEach(m => {
        m.classList.remove('selected', 'previa-final', 'previa-cursada', 'siguiente-final', 'siguiente-cursada');
    });
}