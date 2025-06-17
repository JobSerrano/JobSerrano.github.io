const canvas = document.getElementById("canvas-intensidad");
const ctx = canvas?.getContext("2d");

// -----------------------------
// ANIMACIÓN INTENSIDAD DE CORRIENTE MEJORADA
// -----------------------------
let I = 3;
let escalaVelocidad = 0.3;
let velocidadVisual = I * escalaVelocidad;

const electrones = [];

if (ctx) {
    // Inicializar electrones
    for (let i = 0; i < 100; i++) {
        electrones.push({
            x: Math.random() * canvas.width,
            y: 75 + Math.random() * 20 - 10,
            radius: 5,
            color: "blue",
            symbol: "-",
            velocidadZigZag: (Math.random() - 0.5) * 0.5
        });
    }

    function dibujarConductor() {
        // Tubo conductor
        ctx.fillStyle = "#eee";
        ctx.fillRect(0, 60, canvas.width, 30);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 60, canvas.width, 30);

        // Texto de intensidad
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText("Intensidad de corriente I = " + I.toFixed(2) + " A", 10, 55);
    }

    function dibujarFlechaCorriente() {
        // Flecha de corriente convencional (de + a -)
        ctx.beginPath();
        ctx.moveTo(30, 110);
        ctx.lineTo(110, 110);
        ctx.lineTo(100, 105);
        ctx.moveTo(110, 110);
        ctx.lineTo(100, 115);
        ctx.strokeStyle = "orange";
        ctx.stroke();

        ctx.fillStyle = "orange";
        ctx.fillText("𝐈", 115, 114);
    }

    function dibujarCampoE() {
        // Campo eléctrico en sentido convencional (mismo que I)
        ctx.beginPath();
        ctx.moveTo(canvas.width - 130, 40);
        ctx.lineTo(canvas.width - 50, 40);
        ctx.lineTo(canvas.width - 60, 35);
        ctx.moveTo(canvas.width - 50, 40);
        ctx.lineTo(canvas.width - 60, 45);
        ctx.strokeStyle = "magenta";
        ctx.stroke();
        ctx.fillStyle = "magenta";
        ctx.fillText("𝐄", canvas.width - 45, 44);
    }

    function dibujarFormula() {
        ctx.fillStyle = "black";
        ctx.font = "14px serif";
        ctx.fillText("I = n · A · e · vₐ", canvas.width - 220, 25);
    }

    function moverElectrones() {
        for (const e of electrones) {
            e.x -= velocidadVisual;
            e.y += Math.sin(Date.now() / 100 + e.x / 10) * e.velocidadZigZag;
            if (e.x < -10) e.x = canvas.width + 10;
        }
    }

    function dibujarElectrones() {
        for (const e of electrones) {
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
            ctx.fillStyle = e.color;
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.fillText(e.symbol, e.x - 4, e.y + 4);
        }
    }

    function animarIntensidad() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarConductor();
        dibujarFlechaCorriente();
        dibujarCampoE();
        dibujarFormula();
        moverElectrones();
        dibujarElectrones();
        requestAnimationFrame(animarIntensidad);
    }

    animarIntensidad();
}

// Controles para aumentar/disminuir I
function aumentarIntensidad() {
    if (I < 10) {
        I += 0.5;
        velocidadVisual = I * escalaVelocidad;
    }
}

function disminuirIntensidad() {
    if (I > 0.5) {
        I -= 0.5;
        velocidadVisual = I * escalaVelocidad;
    }
}



// -----------------------------
// ANIMACIÓN VELOCIDAD DE ARRASTRE MEJORADA Y REALISTA
// -----------------------------
const canvasV = document.getElementById("canvas-velocidad");
const ctxV = canvasV?.getContext("2d");

let velocidad = 1.5;
const electrones1 = [];

if (ctxV) {
    for (let i = 0; i < 30; i++) {
        electrones1.push({
            x: 60 + Math.random() * 480,
            y: 90 + Math.random() * 20,
            radius: 6,
            symbol: "-",
            color: "#0033cc" // azul oscuro más realista
        });
    }

    function dibujarConductor() {
        // Conductor
        ctxV.fillStyle = "#e0e0e0";
        ctxV.fillRect(50, 70, 500, 60);

        // Contorno
        ctxV.strokeStyle = "black";
        ctxV.strokeRect(50, 70, 500, 60);

        // Etiqueta L
        ctxV.beginPath();
        ctxV.moveTo(50, 140);
        ctxV.lineTo(550, 140);
        ctxV.strokeStyle = "black";
        ctxV.stroke();
        ctxV.fillStyle = "black";
        ctxV.font = "12px Arial";
        ctxV.fillText("L", 300, 135);

        // Sección transversal A
        ctxV.beginPath();
        ctxV.moveTo(560, 70);
        ctxV.lineTo(580, 70);
        ctxV.lineTo(580, 130);
        ctxV.lineTo(560, 130);
        ctxV.closePath();
        ctxV.fillStyle = "#ccc";
        ctxV.fill();
        ctxV.strokeStyle = "black";
        ctxV.stroke();
        ctxV.fillStyle = "black";
        ctxV.fillText("A", 565, 105);
    }

    function dibujarElectrones() {
        for (const e of electrones1) {
            ctxV.beginPath();
            ctxV.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
            ctxV.fillStyle = e.color;
            ctxV.fill();
            ctxV.fillStyle = "white";
            ctxV.font = "bold 12px Arial";
            ctxV.fillText(e.symbol, e.x - 4, e.y + 4);
        }
    }

    function moverElectrones() {
        for (const e of electrones1) {
            e.x += velocidad;
            if (e.x > 550) e.x = 50;
        }
    }

    function dibujarFlecha(x, y, largo, etiqueta, color) {
        ctxV.beginPath();
        ctxV.moveTo(x, y);
        ctxV.lineTo(x + largo, y);
        ctxV.lineTo(x + largo - 5, y - 5);
        ctxV.moveTo(x + largo, y);
        ctxV.lineTo(x + largo - 5, y + 5);
        ctxV.strokeStyle = color;
        ctxV.stroke();

        ctxV.fillStyle = color;
        ctxV.font = "12px Arial";
        ctxV.fillText(etiqueta, x + largo + 5, y + 4);
    }

    function dibujarVectores() {
        dibujarFlecha(70, 40, 60, "𝐄", "blue");       // Campo eléctrico
        dibujarFlecha(70, 60, 60, "𝐉", "orange");     // Densidad de corriente
        dibujarFlecha(70, 20, 60, "𝑣ₐ", "magenta");   // Velocidad de arrastre
    }

    function dibujarFormula() {
        ctxV.fillStyle = "black";
        ctxV.font = "14px serif";
        ctxV.fillText("vₐ = I / (n · A · e)", 350, 50);
    }

    function animarVelocidad() {
        ctxV.clearRect(0, 0, canvasV.width, canvasV.height);
        dibujarConductor();
        moverElectrones();
        dibujarElectrones();
        dibujarVectores();
        dibujarFormula();
        requestAnimationFrame(animarVelocidad);
    }

    animarVelocidad();
}

// Controles externos
function aumentarVelocidad() {
    if (velocidad < 5) velocidad += 0.5;
}
function disminuirVelocidad() {
    if (velocidad > 0.5) velocidad -= 0.5;
}


// -----------------------------
// ANIMACIÓN DENSIDAD DE CORRIENTE MEJORADA Y CORREGIDA
// -----------------------------
const canvasJ = document.getElementById("canvas-densidad");
const ctxJ = canvasJ?.getContext("2d");

let cantidadCargas = 5;
const cargas = [];

if (ctxJ) {
    // Crear cargas (electrones solamente)
    for (let i = 0; i < 100; i++) {
        cargas.push({
            x: 60 + Math.random() * 480,
            y: 40 + Math.random() * 60,
            radius: 5,
            symbol: "-",         // solo electrones
            color: "blue",        // color fijo
            speed: 0.5 + Math.random() * 1
        });
    }

    function dibujarCanal() {
        ctxJ.fillStyle = "#ddd";
        ctxJ.fillRect(50, 30, 500, 100);

        // Contorno
        ctxJ.strokeStyle = "black";
        ctxJ.strokeRect(50, 30, 500, 100);

        // Área transversal A
        ctxJ.fillStyle = "black";
        ctxJ.font = "12px Arial";
        ctxJ.fillText("Área A", 560, 90);
        ctxJ.beginPath();
        ctxJ.moveTo(560, 30);
        ctxJ.lineTo(580, 30);
        ctxJ.lineTo(580, 130);
        ctxJ.lineTo(560, 130);
        ctxJ.closePath();
        ctxJ.stroke();
    }

    function dibujarFlechaJ(x, y, largo, etiqueta, color) {
        ctxJ.beginPath();
        ctxJ.moveTo(x, y);
        ctxJ.lineTo(x + largo, y);
        ctxJ.lineTo(x + largo - 5, y - 5);
        ctxJ.moveTo(x + largo, y);
        ctxJ.lineTo(x + largo - 5, y + 5);
        ctxJ.strokeStyle = color;
        ctxJ.stroke();

        ctxJ.fillStyle = color;
        ctxJ.font = "12px Arial";
        ctxJ.fillText(etiqueta, x + largo + 5, y + 4);
    }

    function dibujarVectoresJ() {
        for (let x = 100; x <= 500; x += 100) {
            dibujarFlechaJ(x, 80, 30, "𝐉", "orange");
        }

        // Fórmula
        ctxJ.fillStyle = "black";
        ctxJ.font = "14px serif";
        ctxJ.fillText("𝐉 = I / A = n · e · vₐ", 320, 25);
    }

    function dibujarCargas() {
        for (let i = 0; i < cantidadCargas * 5; i++) {
            const c = cargas[i];
            ctxJ.beginPath();
            ctxJ.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
            ctxJ.fillStyle = c.color;
            ctxJ.fill();

            ctxJ.fillStyle = "white";
            ctxJ.font = "bold 12px Arial";
            ctxJ.fillText(c.symbol, c.x - 4, c.y + 4);
        }
    }

    function moverCargas() {
        for (let i = 0; i < cantidadCargas * 5; i++) {
            const c = cargas[i];
            c.x -= c.speed;
            if (c.x < 50) c.x = 550;
        }
    }

    function animarDensidad() {
        ctxJ.clearRect(0, 0, canvasJ.width, canvasJ.height);
        dibujarCanal();
        moverCargas();
        dibujarCargas();
        dibujarVectoresJ();
        requestAnimationFrame(animarDensidad);
    }

    animarDensidad();
}

// Controles
function aumentarDensidad() {
    if (cantidadCargas < 15) cantidadCargas++;
}
function disminuirDensidad() {
    if (cantidadCargas > 1) cantidadCargas--;
}
