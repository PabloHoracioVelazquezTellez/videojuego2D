
"use strict";

class GameObject {
    constructor(
        id, x, y, speedX, speedY,
        equation, type, color, icon,
        pattern = "diagonal"
    ) {
        this.id = id;

        this.x = x;
        this.y = y;
        this.collisionFlash = 0;
        this.collisionCooldown = 0;
        this.speedX = speedX;
        this.speedY = speedY;

        this.equation = equation;
        this.type = type;
        this.color = color;
        this.icon = icon;
        
        this.sprite = null;
        this.spriteSize = 38;

        // Patrón de movimiento
        this.pattern = pattern;

        // Datos de referencia de la trayectoria
        this.originX = x;
        this.originY = y;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = 30 + Math.random() * 35;
        this.amplitude = 25 + Math.random() * 35;
        this.angularSpeed = 0.025 + Math.random() * 0.02;

        this.radius = 10;
        this.labelWidth = 190;
        this.labelHeight = 30;

        // Historial de posiciones para la estela
        this.trail = [];
        this.maxTrailLength = 28;

        this.trail.push({ x: this.x, y: this.y });
    }

    update(canvasWidth, canvasHeight) {
        if (this.collisionFlash > 0) {
            this.collisionFlash--;
        }

        if (this.collisionCooldown > 0) {
            this.collisionCooldown--;
        }
        switch (this.pattern) {

            case "vertical":
                // Subir y bajar manteniendo la posición horizontal
                this.y += this.speedY;

                if (this.y - this.radius <= 0) {
                    this.y = this.radius;
                    this.speedY = Math.abs(this.speedY);
                } else if (this.y + this.radius >= canvasHeight) {
                    this.y = canvasHeight - this.radius;
                    this.speedY = -Math.abs(this.speedY);
                }
                break;

            case "circular":
                // Avanzar el ángulo de la órbita
                this.angle += this.angularSpeed;

                // Calcular posición usando seno y coseno
                this.x = this.originX
                    + Math.cos(this.angle) * this.orbitRadius;

                this.y = this.originY
                    + Math.sin(this.angle) * this.orbitRadius;
                break;

            case "ondulatorio":
                // Avanzar horizontalmente
                this.x += this.speedX;

                // Oscilar verticalmente siguiendo una función seno
                this.angle += this.angularSpeed;

                this.y = this.originY
                    + Math.sin(this.angle) * this.amplitude;

                // Cambiar dirección al llegar a los extremos
                if (this.x - this.radius <= 0) {
                    this.x = this.radius;
                    this.speedX = Math.abs(this.speedX);
                } else if (this.x + this.radius >= canvasWidth) {
                    this.x = canvasWidth - this.radius;
                    this.speedX = -Math.abs(this.speedX);
                }

                // Mantener la oscilación dentro del Canvas
                if (this.y - this.radius < 0) {
                    this.originY = this.radius + this.amplitude;
                } else if (this.y + this.radius > canvasHeight) {
                    this.originY = canvasHeight - this.radius
                        - this.amplitude;
                }
                break;

            
            case "curvo": {
                // Avanzar horizontalmente.
                this.x += this.speedX;

                // Avanzar el parámetro de la curva.
                this.angle += this.angularSpeed;

                // Curva parabólica con oscilación suave.
                this.y = this.originY
                    + Math.sin(this.angle) * this.amplitude
                    + Math.sin(this.angle * 0.5) * (this.amplitude * 0.35);

                // Rebotar en los extremos horizontales.
                if (this.x - this.radius <= 0) {
                    this.x = this.radius;
                    this.speedX = Math.abs(this.speedX);
                } else if (this.x + this.radius >= canvasWidth) {
                    this.x = canvasWidth - this.radius;
                    this.speedX = -Math.abs(this.speedX);
                }

                // Mantener la trayectoria dentro del Canvas.
                this.y = Math.max(
                    this.radius,
                    Math.min(canvasHeight - this.radius, this.y)
                );

                break;
            }

            case "diagonal":
            default:
                // Movimiento diagonal y rebote horizontal
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x - this.radius <= 0) {
                    this.x = this.radius;
                    this.speedX = Math.abs(this.speedX);
                } else if (this.x + this.radius >= canvasWidth) {
                    this.x = canvasWidth - this.radius;
                    this.speedX = -Math.abs(this.speedX);
                }

                // Rebote vertical
                if (this.y - this.radius <= 0) {
                    this.y = this.radius;
                    this.speedY = Math.abs(this.speedY);
                } else if (this.y + this.radius >= canvasHeight) {
                    this.y = canvasHeight - this.radius;
                    this.speedY = -Math.abs(this.speedY);
                }
                break;
                
        }

        // Guardar la posición para la estela
        this.trail.push({ x: this.x, y: this.y });

        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    drawTrail(ctx) {
        if (this.trail.length < 2) return;

        ctx.save();

        for (let i = 1; i < this.trail.length; i++) {
            const previous = this.trail[i - 1];
            const current = this.trail[i];

            const opacity = i / (this.trail.length - 1);

            ctx.globalAlpha = opacity;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2 + opacity * 2;
            ctx.lineCap = "round";

            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(current.x, current.y);
            ctx.stroke();
        }

        ctx.restore();
    }

    draw(ctx) {
        // Dibujar la trayectoria
        this.drawTrail(ctx);

        // Dibujar el marcador
        
        if (
            this.sprite &&
            this.sprite.complete &&
            this.sprite.naturalWidth > 0
        ) {
            ctx.drawImage(
                this.sprite,
                this.x - this.spriteSize / 2,
                this.y - this.spriteSize / 2,
                this.spriteSize,
                this.spriteSize
            );
        } else {
            // Marcador provisional mientras carga la imagen.
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }


        // Colocar la etiqueta junto al marcador
        let labelX = this.x + 18;
        let labelY = this.y - 38;

        if (labelX + this.labelWidth > ctx.canvas.width) {
            labelX = this.x - this.labelWidth - 18;
        }

        if (labelY < 0) {
            labelY = this.y + 18;
        }

        // Fondo de la etiqueta
        ctx.fillStyle = "#111d2b";
        ctx.fillRect(
            labelX, labelY,
            this.labelWidth, this.labelHeight
        );

        // Borde
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(
            labelX, labelY,
            this.labelWidth, this.labelHeight
        );

        // Icono
        ctx.fillStyle = this.color;
        ctx.font = "bold 16px Arial";
        ctx.fillText(this.icon, labelX + 7, labelY + 20);

        // Ecuación
        ctx.fillStyle = "#eaf2ff";
        ctx.font = "13px Arial";
        ctx.fillText(
            this.equation,
            labelX + 30,
            labelY + 19,
            this.labelWidth - 35
        );
        
        ctx.fillStyle = "#9eb4c9";
        ctx.font = "10px Arial";
        ctx.textAlign = "left";
        ctx.fillText(
            this.pattern,
            labelX + 30,
            labelY + 27
        );
        
        if (this.collisionFlash > 0) {
            const progress = this.collisionFlash / 12;

            ctx.save();

            // Anillo que se expande durante el impacto.
            ctx.beginPath();
            ctx.arc(
                this.x,
                this.y,
                this.radius + (1 - progress) * 22,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
            ctx.lineWidth = 2 + progress * 2;
            ctx.stroke();

            // Destello alrededor del objeto.
            ctx.beginPath();
            ctx.arc(
                this.x,
                this.y,
                this.radius + 4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(120, 255, 190, ${progress * 0.45})`;
            ctx.fill();

            ctx.restore();
        }


    }

    
    containsPoint(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;

        // Área de clic un poco mayor que el marcador.
        const hitRadius = this.radius + 12;

        return dx * dx + dy * dy <= hitRadius * hitRadius;
    }

}
