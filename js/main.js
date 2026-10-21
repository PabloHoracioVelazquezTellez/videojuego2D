
"use strict";

// Canvas y contexto 2D
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const canvasBackground = new Image();
canvasBackground.src = "assets/fondo-canvas.png";








const mathCursor = document.getElementById("mathCursor");
const gameCanvas = document.getElementById("gameCanvas");

if (mathCursor && gameCanvas) {

    gameCanvas.addEventListener("mouseenter", () => {
        mathCursor.style.display = "block";
    });

    gameCanvas.addEventListener("mouseleave", () => {
        mathCursor.style.display = "none";
    });

    gameCanvas.addEventListener("mousemove", (event) => {
        mathCursor.style.left = `${event.clientX}px`;
        mathCursor.style.top = `${event.clientY}px`;
    });

}






// Controles
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

const scoreElement = document.getElementById("score");
const objectCountElement = document.getElementById("objectCount");
const collisionCountElement = document.getElementById("collisionCount");
const gameStatus = document.getElementById("gameStatus");

// Estado del juego
let gameRunning = false;
let score = 0;
let collisionCount = 0;
let animationId = null;


const spriteFiles = [
    "calabaza.png",
    "fantasma.png",
    "hoja.png",
    "sombrero.png",
    "atomo.png",
    "bellota.png"
];

const sprites = spriteFiles.map(filename => {
    const image = new Image();
    image.src = `assets/sprites/${filename}`;
    return image;
});

function getRandomSprite() {
    return sprites[
        Math.floor(Math.random() * sprites.length)
    ];
}


// Colección de objetos matemáticos
const objects = [];

const colors = [
    "#63ffd2",
    "#70b8ff",
    "#ffcc66",
    "#ff78a8",
    "#bd9cff",
    "#a7f070"
];

// Definiciones iniciales de objetos
const objectDefinitions = [
    { equation: "y = 2x + 1", type: "lineal", icon: "↗" },
    { equation: "y = -x + 3", type: "lineal", icon: "↙" },
    { equation: "y = 3", type: "constante", icon: "↕" },
    { equation: "y = x²", type: "cuadratica", icon: "∪" },
    { equation: "y = -x²", type: "cuadratica", icon: "∩" },
    { equation: "y = sen(x)", type: "trigonometrica", icon: "∿" },
    { equation: "y = cos(x)", type: "trigonometrica", icon: "≈" },
    { equation: "y = x³", type: "cubica", icon: "∛" },
    { equation: "y = 2x - 4", type: "lineal", icon: "↗" },
    { equation: "y = -2x", type: "lineal", icon: "↙" },
    { equation: "y = 4", type: "constante", icon: "↕" },
    { equation: "y = √x", type: "radical", icon: "√" },
    { equation: "y = |x|", type: "valor absoluto", icon: "V" },
    { equation: "y = ln(x)", type: "logaritmica", icon: "ln" },
    { equation: "y = eˣ", type: "exponencial", icon: "e" },
    { equation: "y = tan(x)", type: "trigonometrica", icon: "∠" },
    { equation: "y = 1/x", type: "racional", icon: "÷" },
    { equation: "y = x⁴", type: "polinomica", icon: "⁴" },
    { equation: "y = 5 - x", type: "lineal", icon: "↙" },
    { equation: "y = sen(2x)", type: "trigonometrica", icon: "∿" },
    { equation: "y = cos(2x)", type: "trigonometrica", icon: "≈" },
    { equation: "y = x² + 1", type: "cuadratica", icon: "∪" },
    { equation: "y = 2ˣ", type: "exponencial", icon: "e" },
    { equation: "y = √|x|", type: "radical", icon: "√" },
    { equation: "y = 2 - x²", type: "cuadratica", icon: "∩" }
];



function drawCanvasBackground() {
    if (
        canvasBackground.complete &&
        canvasBackground.naturalWidth > 0
    ) {
        ctx.drawImage(
            canvasBackground,
            0,
            0,
            canvas.width,
            canvas.height
        );
    } else {
        // Fondo provisional mientras carga la imagen.
        ctx.fillStyle = "#100d24";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function getPatternForDefinition(definition) {
    const type = (
        `${definition.type} ${definition.equation}`
    ).toLowerCase();

    if (
        type.includes("constante") ||
        /^y\s*=\s*-?\d+(\.\d+)?$/.test(type.trim())
    ) {
        return "vertical";
    }

    if (
        type.includes("trigonom") ||
        type.includes("sen") ||
        type.includes("sin") ||
        type.includes("cos")
    ) {
        return "ondulatorio";
    }

    if (
        type.includes("cuadr") ||
        type.includes("exponencial") ||
        type.includes("cúbica") ||
        type.includes("cubica") ||
        type.includes("radical") ||
        type.includes("polinom")
    ) {
        return "curvo";
    }

    if (
        type.includes("racional") ||
        type.includes("logarítmica") ||
        type.includes("logaritmica") ||
        type.includes("valor absoluto")
    ) {
        return "circular";
    }

    if (type.includes("lineal")) {
        return "diagonal";
    }

    return "curvo";
}


// Crear los 25 objetos
function createObjects() {
    objects.length = 0;

    objectDefinitions.forEach((definition, index) => {
        // Velocidades aleatorias distintas de cero
        let speedX = Math.random() * 2 + 0.8;
        let speedY = Math.random() * 2 + 0.8;

        // Elegir dirección aleatoria
        if (Math.random() < 0.5) speedX *= -1;
        if (Math.random() < 0.5) speedY *= -1;

        

        // Evitar que aparezcan demasiado juntos
        // Dejar espacio para las órbitas circulares
        const x = 100 + Math.random() * (canvas.width - 200);
        const y = 100 + Math.random() * (canvas.height - 200);

        // Repartir los cuatro patrones entre los objetos
        const pattern = getPatternForDefinition(definition);
        

        const object = new GameObject(
            index + 1,
            x,
            y,
            speedX,
            speedY,
            definition.equation,
            definition.type,
            colors[index % colors.length],
            definition.icon,
            pattern
        );

        objects.push(object);
        objects[objects.length - 1].sprite = getRandomSprite();
    });

    updateCounters();
}

// Dibujar el plano cartesiano

function drawCoordinatePlane() {
    const width = canvas.width;
    const height = canvas.height;

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 40;

    // Cuadrícula semitransparente sobre el fondo.
    ctx.strokeStyle = "rgba(100, 150, 190, 0.30)";
    ctx.lineWidth = 1;

    for (let x = centerX % scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = centerY % scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Ejes principales.
    ctx.strokeStyle = "rgba(160, 195, 220, 0.85)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Etiquetas de los ejes.
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.fillText("X", width - 22, centerY - 12);
    ctx.fillText("Y", centerX + 12, 20);

    // Origen del plano.
    ctx.fillStyle = "#63ffd2";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();
}

// Dibujar todos los objetos

function drawObjects() {
    objects.forEach(object => {
        if (!object) return;

        // Dibujar el objeto, su estela y su ecuación.
        object.draw(ctx);
    });
}


// Actualizar posiciones
function updateObjects() {
    objects.forEach(object => {
        object.update(canvas.width, canvas.height);
    });
}


function checkCollisions() {
    for (let i = 0; i < objects.length; i++) {
        const a = objects[i];

        if (!a) continue;

        for (let j = i + 1; j < objects.length; j++) {
            const b = objects[j];

            if (!b) continue;

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = a.radius + b.radius;

            // Los objetos están suficientemente cerca para chocar.
            if (distance < minDistance) {
                // Evitar repetir el impacto en todos los fotogramas.
                if (
                    a.collisionCooldown === 0 &&
                    b.collisionCooldown === 0
                ) {
                    a.collisionFlash = 12;
                    b.collisionFlash = 12;

                    a.collisionCooldown = 15;
                    b.collisionCooldown = 15;

                    // Invertir la dirección para simular el rebote.
                    if (a.pattern === "vertical") {
                        a.speedY *= -1;
                    } else if (a.pattern === "diagonal") {
                        a.speedX *= -1;
                        a.speedY *= -1;
                    } else if (a.pattern === "circular") {
                        a.angularSpeed *= -1;
                    } else if (a.pattern === "ondulatorio") {
                        a.speedX *= -1;
                    }

                    if (b.pattern === "vertical") {
                        b.speedY *= -1;
                    } else if (b.pattern === "diagonal") {
                        b.speedX *= -1;
                        b.speedY *= -1;
                    } else if (b.pattern === "circular") {
                        b.angularSpeed *= -1;
                    } else if (b.pattern === "ondulatorio") {
                        b.speedX *= -1;
                    } else if (
                        a.pattern === "ondulatorio" ||
                        a.pattern === "curvo"
                    ) {
                        a.speedX *= -1;
                    }

                    collisionCount++;
                }
            }
        }
    }
}


// Actualizar la información de la interfaz
function updateCounters() {
    scoreElement.textContent = score;
    objectCountElement.textContent = `${objects.length} / 25`;
    collisionCountElement.textContent = collisionCount;
}

// Bucle principal de animación


const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicVolume = document.getElementById("musicVolume");

backgroundMusic.volume = 0.3;

musicButton.addEventListener("click", async () => {
    if (backgroundMusic.paused) {
        try {
            await backgroundMusic.play();
            musicButton.textContent = " Pausar música";
        } catch (error) {
            console.error("No se pudo reproducir la música:", error);
        }
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "🎵 Activar música";
    }
});

musicVolume.addEventListener("input", () => {
    backgroundMusic.volume = Number(musicVolume.value) / 100;
});

function gameLoop() {
    drawCanvasBackground();
    drawCoordinatePlane();

    if (gameRunning) {
        updateObjects();
        checkCollisions();
    }

    drawObjects();

    if (gameRunning) {
        animationId = requestAnimationFrame(gameLoop);
    }
}


// Iniciar el juego
function startGame() {
    if (gameRunning) return;

    if (objects.length === 0) {
        createObjects();
    }

    gameRunning = true;
    gameStatus.textContent = "En marcha";

    gameLoop();
}

// Reiniciar el juego
function resetGame() {
    gameRunning = false;

    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    score = 0;
    collisionCount = 0;

    createObjects();

    gameStatus.textContent = "Listo";

    drawCoordinatePlane();
    drawObjects();
    updateCounters();
}

// Seleccionar objetos con el ratón


canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX =
        (event.clientX - rect.left) * canvas.width / rect.width;

    const mouseY =
        (event.clientY - rect.top) * canvas.height / rect.height;
    
    for (let i = objects.length - 1; i >= 0; i--) {
        const object = objects[i];

        if (!object) continue;

        if (object.containsPoint(mouseX, mouseY)) {
            const definition =
                objectDefinitions[
                    Math.floor(Math.random() * objectDefinitions.length)
                ];

            const pattern = getPatternForDefinition(definition);

            const x = 60 + Math.random() * (canvas.width - 120);
            const y = 60 + Math.random() * (canvas.height - 120);

            const speedX =
                (Math.random() * 2 + 0.5) *
                (Math.random() < 0.5 ? -1 : 1);

            const speedY =
                (Math.random() * 2 + 0.5) *
                (Math.random() < 0.5 ? -1 : 1);

            const color =
                colors[Math.floor(Math.random() * colors.length)];

            objects[i] = new GameObject(
                object.id,
                x,
                y,
                speedX,
                speedY,
                definition.equation,
                definition.type,
                color,
                definition.icon,
                pattern
            );
            objects[i].sprite = getRandomSprite();

            score++;
            updateCounters();
            break;
        }
    }
});



// Eventos de los botones
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

// Estado inicial
createObjects();

drawCoordinatePlane();
drawObjects();
