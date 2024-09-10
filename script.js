let equipos = [
    { nombre: "Atlético Nacional", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Millonarios", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "América de Cali", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Independiente Medellín", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Junior", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Santa Fe", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Deportivo Cali", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "La Equidad", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Deportivo Pereira", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Bucaramanga", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
    { nombre: "Envigado", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
];

function actualizarTabla() {
    equipos.sort((a, b) => {
        const puntosA = a.pg * 3 + a.pe;
        const puntosB = b.pg * 3 + b.pe;
        if (puntosB !== puntosA) {
            return puntosB - puntosA;
        }
        return (b.gf - b.gc) - (a.gf - a.gc);
    });

    const tbody = document.querySelector("#liga-table tbody");
    tbody.innerHTML = '';
    equipos.forEach((equipo, index) => {
        const row = document.createElement("tr");
        const dg = equipo.gf - equipo.gc;
        const pts = equipo.pg * 3 + equipo.pe;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${equipo.nombre}</td>
            <td>${equipo.pj}</td>
            <td>${equipo.pg}</td>
            <td>${equipo.pe}</td>
            <td>${equipo.pp}</td>
            <td>${equipo.gf}</td>
            <td>${equipo.gc}</td>
            <td>${dg}</td>
            <td>${pts}</td>
        `;
        tbody.appendChild(row);
    });
}

function llenarSelectEquipos() {
    const localSelect = document.getElementById('local-team');
    const visitorSelect = document.getElementById('visitor-team');
    equipos.forEach(equipo => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = equipo.nombre;
        option1.textContent = option2.textContent = equipo.nombre;
        localSelect.appendChild(option1);
        visitorSelect.appendChild(option2);
    });
}

function agregarResultado() {
    const localTeam = document.getElementById('local-team').value;
    const visitorTeam = document.getElementById('visitor-team').value;
    const localScore = parseInt(document.getElementById('local-score').value);
    const visitorScore = parseInt(document.getElementById('visitor-score').value);

    if (localTeam === visitorTeam) {
        alert('Por favor seleccione equipos diferentes');
        return;
    }

    if (isNaN(localScore) || isNaN(visitorScore)) {
        alert('Por favor ingrese resultados válidos');
        return;
    }

    const local = equipos.find(e => e.nombre === localTeam);
    const visitor = equipos.find(e => e.nombre === visitorTeam);

    local.pj++;
    visitor.pj++;
    local.gf += localScore;
    local.gc += visitorScore;
    visitor.gf += visitorScore;
    visitor.gc += localScore;

    if (localScore > visitorScore) {
        local.pg++;
        visitor.pp++;
    } else if (localScore < visitorScore) {
        visitor.pg++;
        local.pp++;
    } else {
        local.pe++;
        visitor.pe++;
    }

    actualizarTabla();
    document.getElementById('local-score').value = '';
    document.getElementById('visitor-score').value = '';
}

document.addEventListener("DOMContentLoaded", () => {
    llenarSelectEquipos();
    actualizarTabla();
    document.getElementById('submit-result').addEventListener('click', agregarResultado);
});
