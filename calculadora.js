const e = 1.6e-19; // Carga del electrón (C)
let calculoActual = "";

const formCalc = document.getElementById("form-calculadora");
const inputsContainer = document.getElementById("inputs-container");
const resultado = document.getElementById("resultado");

function seleccionarCalculo(tipo) {
    calculoActual = tipo;
    formCalc.style.display = "block";
    resultado.innerHTML = "";

    let html = "";

    if (tipo === "I") {
        html = `
      <label>Área A (m²): <input type="number" id="area" step="any" required></label><br>
      <label>Densidad n (1/m³): <input type="number" id="n" step="any" required></label><br>
      <label>Velocidad de arrastre v<sub>d</sub> (m/s): <input type="number" id="vd" step="any" required></label><br>
    `;
    } else if (tipo === "vd") {
        html = `
      <label>Intensidad I (A): <input type="number" id="i" step="any" required></label><br>
      <label>Área A (m²): <input type="number" id="area" step="any" required></label><br>
      <label>Densidad n (1/m³): <input type="number" id="n" step="any" required></label><br>
    `;
    } else if (tipo === "J") {
        html = `
      <label>Intensidad I (A): <input type="number" id="i" step="any" required></label><br>
      <label>Área A (m²): <input type="number" id="area" step="any" required></label><br>
    `;
    }

    inputsContainer.innerHTML = html;
}

// Utilidad: formatea con notación científica legible (como ×10⁻¹⁷) o normal con separadores
function formatearResultado(num) {
    if (Math.abs(num) < 0.001 || Math.abs(num) >= 1e6) {
        const exponencial = num.toExponential(3);
        const [base, exp] = exponencial.split("e");
        const exponente = parseInt(exp);
        return `${parseFloat(base)} × 10<sup>${exponente}</sup>`;
    } else {
        return num.toLocaleString("en-US", { maximumFractionDigits: 3 });
    }
}

formCalc.addEventListener("submit", function (event) {
    event.preventDefault();

    const A = parseFloat(document.getElementById("area")?.value);
    const n = parseFloat(document.getElementById("n")?.value);
    const I = parseFloat(document.getElementById("i")?.value);
    const vd = parseFloat(document.getElementById("vd")?.value);

    let resTexto = "";

    // Validaciones básicas
    if (
        (calculoActual === "I" && (isNaN(A) || isNaN(n) || isNaN(vd))) ||
        (calculoActual === "vd" && (isNaN(I) || isNaN(A) || isNaN(n))) ||
        (calculoActual === "J" && (isNaN(I) || isNaN(A)))
    ) {
        resultado.innerHTML = `<p style="color: red;"><strong>Error:</strong> Por favor completa todos los campos correctamente.</p>`;
        return;
    }

    if (A <= 0 || (n !== undefined && n <= 0) || (vd !== undefined && vd < 0) || (I !== undefined && I < 0)) {
        resultado.innerHTML = `<p style="color: red;"><strong>Error:</strong> Los valores deben ser positivos.</p>`;
        return;
    }

    if (calculoActual === "I") {
        const Icalc = n * A * e * vd;
        resTexto = `I = ${formatearResultado(Icalc)} A`;
    } else if (calculoActual === "vd") {
        const vdCalc = I / (n * A * e);
        resTexto = `v<sub>d</sub> = ${formatearResultado(vdCalc)} m/s`;
    } else if (calculoActual === "J") {
        const Jcalc = I / A;
        resTexto = `J = ${formatearResultado(Jcalc)} A/m²`;
    }

    resultado.innerHTML = `<p><strong>Resultado:</strong> ${resTexto}</p>`;
});