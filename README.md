# Videojuego matemático interactivo

## 1. Descripción del proyecto

**Mathack** es un videojuego matemático desarrollado como una aplicación web mediante HTML, CSS y JavaScript. Su interfaz gráfica utiliza el elemento Canvas de HTML5 para representar un entorno interactivo en el que aparecen objetos con expresiones matemáticas y diferentes patrones de movimiento.

El proyecto combina conceptos de matemáticas, programación y graficación por computadora para crear una experiencia visual en la que el usuario puede interactuar con los objetos que aparecen en pantalla.

El videojuego cuenta con una ambientación visual inspirada en la temporada de Halloween y el otoño, utilizando imágenes temáticas como calabazas, fantasmas, hojas, sombreros, átomos y bellotas. También incorpora elementos visuales matemáticos, como un plano de coordenadas, expresiones funcionales y efectos de animación.

## 2. Contexto

El proyecto surge como una aplicación práctica de los conocimientos adquiridos en la asignatura de Graficación de la carrera de Ingeniería en Sistemas Computacionales.

Durante su desarrollo se implementaron técnicas de dibujo bidimensional, representación de imágenes, animación, manejo de eventos del mouse, detección de colisiones y actualización continua de elementos gráficos.

En lugar de limitarse a mostrar figuras estáticas, Mathack utiliza un entorno dinámico en el que los objetos pueden desplazarse, interactuar entre sí y responder a las acciones del usuario.

La representación de expresiones matemáticas, como funciones constantes, lineales, polinomiales, trigonométricas, exponenciales y racionales, permite integrar contenido matemático dentro de la experiencia visual del videojuego.

## 3. Objetivo general

Desarrollar un videojuego web interactivo que aplique conceptos de graficación por computadora mediante la representación, animación e interacción de objetos asociados con expresiones matemáticas, utilizando tecnologías web y el elemento Canvas de HTML5.

### 3.1. Objetivos específicos

- Implementar un entorno gráfico bidimensional mediante Canvas.
- Representar un plano de coordenadas con ejes y cuadrícula.
- Crear objetos gráficos asociados con distintas expresiones matemáticas.
- Implementar diferentes patrones de movimiento, como desplazamientos verticales, diagonales, circulares, ondulatorios y curvos.
- Incorporar imágenes como sprites para sustituir las representaciones gráficas básicas de los objetos.
- Detectar colisiones entre objetos y mostrar efectos visuales asociados.
- Permitir la interacción mediante clics para sustituir objetos y actualizar la puntuación.
- Incorporar elementos de interfaz, como etiquetas matemáticas, un puntero personalizado y controles de audio.
- Organizar el código en archivos HTML, CSS y JavaScript para facilitar su mantenimiento.

## 4. Justificación

El desarrollo de Mathack permite aplicar de manera práctica los conceptos estudiados en Graficación, relacionando los fundamentos de programación con la creación de una aplicación interactiva.

El uso de Canvas permite dibujar y actualizar elementos gráficos mediante código, mientras que JavaScript administra el movimiento, los eventos del usuario y la lógica del videojuego. Por su parte, CSS permite personalizar la apariencia de la interfaz y HTML proporciona la estructura de la aplicación.

La incorporación de expresiones matemáticas permite explorar cómo diferentes funciones pueden asociarse con comportamientos visuales y patrones de movimiento. Esto ofrece una forma de relacionar las matemáticas con la programación y la representación gráfica.

Además, el proyecto permite practicar la resolución de problemas técnicos, como la carga de imágenes, la organización de recursos, el manejo del ciclo de animación y la detección de colisiones.

Por estas razones, Mathack constituye una aplicación práctica de conocimientos de ingeniería de software y graficación por computadora, al mismo tiempo que ofrece una base para futuras ampliaciones.

## 5. Tecnologías utilizadas

| Tecnología | Aplicación dentro del proyecto |
|---|---|
| HTML5 | Estructura de la página y elemento Canvas. |
| CSS3 | Diseño visual, estilos de interfaz y personalización del cursor. |
| JavaScript | Lógica del videojuego, movimiento, eventos y colisiones. |
| Canvas API | Dibujo del plano de coordenadas, imágenes, objetos y efectos gráficos. |
| `requestAnimationFrame()` | Actualización continua de la animación. |
| HTML Audio | Reproducción y control de la música del videojuego. |
| Imágenes PNG | Sprites de los objetos y recursos gráficos del escenario. |

## 6. Estructura del proyecto

La organización general de los archivos es la siguiente:

```text
Mathack-Graficacion/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   └── gameObject.js
│
└── assets/
    ├── fondo-canvas.png
    │
    ├── audio/
    │   └── musica.mp3
    │
    └── sprites/
        ├── calabaza.png
        ├── fantasma.png
        ├── hoja.png
        ├── sombrero.png
        ├── atomo.png
        └── bellota.png
```

**Descripción de los archivos principales:**

- **`index.html`:** contiene la estructura de la página, el área de juego y los elementos de interfaz.
- **`css/style.css`:** define los estilos visuales, la distribución de los elementos y la apariencia del puntero personalizado.
- **`js/main.js`:** administra la inicialización del juego, la animación, la puntuación, las interacciones y las colisiones.
- **`js/gameObject.js`:** contiene la lógica de los objetos, sus propiedades, movimientos y representación gráfica.
- **`assets/fondo-canvas.png`:** recurso gráfico destinado al fondo del escenario.
- **`assets/audio/musica.mp3`:** archivo de audio utilizado como música ambiental.
- **`assets/sprites/`:** directorio de imágenes utilizadas para representar los objetos del videojuego.

## 7. Operación del videojuego

### 7.1. Inicio y representación del escenario

Al abrir la aplicación en un navegador compatible, se carga la estructura de la página y se inicializan los elementos necesarios para ejecutar el videojuego.

El área de juego utiliza Canvas para representar el escenario, el plano de coordenadas y los objetos animados. El sistema de dibujo actualiza los elementos gráficos de acuerdo con el estado del juego.

El escenario utiliza recursos visuales temáticos para proporcionar una identidad gráfica propia.

### 7.2. Generación de objetos

El videojuego administra un conjunto de objetos que pueden representar distintas expresiones matemáticas. Cada objeto dispone de propiedades que permiten identificar su función, controlar su posición y determinar su comportamiento visual.

Entre las expresiones contempladas durante el desarrollo se encuentran:

- Funciones constantes.
- Funciones lineales.
- Funciones polinomiales.
- Funciones trigonométricas.
- Funciones exponenciales.
- Funciones racionales.
- Funciones logarítmicas.

Las expresiones se utilizan como etiquetas asociadas con los objetos, relacionando el contenido matemático con la representación visual.

### 7.3. Patrones de movimiento

Los objetos pueden desplazarse siguiendo distintos patrones, según la clasificación asignada a cada expresión.

| Patrón | Descripción |
|---|---|
| Vertical | Desplazamiento principalmente vertical. |
| Diagonal | Movimiento que combina desplazamientos horizontales y verticales. |
| Circular | Trayectoria basada en un comportamiento circular o relacionado con este. |
| Ondulatorio | Movimiento que presenta oscilaciones. |
| Curvo | Desplazamiento que sigue una trayectoria curva. |

Estos patrones permiten variar el comportamiento de los objetos y evitar que todos se desplacen de la misma manera.

### 7.4. Interacción con los objetos

El usuario puede hacer clic sobre los objetos que aparecen en el área de juego. Cuando se detecta una interacción válida, el objeto seleccionado puede ser sustituido por otro, se actualiza la puntuación y se conserva la cantidad establecida de objetos en pantalla.

La detección del clic considera un área de selección ligeramente mayor que el tamaño visual del objeto. Esto facilita la interacción y reduce la precisión necesaria para seleccionarlo.

### 7.5. Detección de colisiones

El sistema comprueba las posibles colisiones entre los objetos del videojuego. Cuando detecta una colisión, puede incrementar el contador correspondiente y activar efectos visuales, como destellos o animaciones temporales.

Estos efectos permiten identificar visualmente los eventos que ocurren durante la ejecución.

### 7.6. Animación y actualización

El videojuego utiliza `requestAnimationFrame()` para programar la actualización de la escena.

En cada ciclo se realizan las operaciones necesarias para representar el fondo, dibujar el plano de coordenadas, actualizar las posiciones de los objetos, comprobar las colisiones y dibujar los elementos visibles.

La actualización continua proporciona la sensación de movimiento y permite que las interacciones se reflejen en pantalla.

### 7.7. Elementos de interfaz

El proyecto incorpora o contempla los siguientes elementos de interfaz:

- **Puntuación:** muestra el avance asociado con las interacciones del usuario.
- **Contador de colisiones:** registra los eventos de colisión detectados.
- **Música ambiental:** permite acompañar la experiencia de juego mediante audio.
- **Control de volumen:** permite ajustar el nivel de reproducción de la música.
- **Puntero personalizado:** sustituye visualmente el cursor convencional dentro del área de juego y puede mostrar una etiqueta matemática como `f(x)`.

Estos elementos complementan la experiencia visual y facilitan la interacción con la aplicación.

## 8. Conclusiones

El desarrollo de Mathack permitió integrar conocimientos de programación web y graficación por computadora en una aplicación interactiva. A través del uso de HTML, CSS, JavaScript y Canvas, se construyó un entorno capaz de representar objetos animados, mostrar expresiones matemáticas y responder a las acciones del usuario.

La implementación de diferentes patrones de movimiento, sprites, efectos de colisión y elementos de interfaz permitió trabajar con aspectos fundamentales de la representación gráfica dinámica. Asimismo, la separación del código en archivos dedicados a la estructura, los estilos y la lógica facilita la comprensión y el mantenimiento del proyecto.

Uno de los principales aprendizajes consiste en comprender que la creación de una aplicación gráfica no depende únicamente de dibujar elementos en pantalla, sino también de administrar correctamente su estado, sus posiciones, sus eventos y el orden en que se representan.

Finalmente, Mathack constituye una base funcional para continuar explorando técnicas de animación e interacción en aplicaciones web. Su estructura permite incorporar nuevas mecánicas, mejorar la representación matemática y ampliar la experiencia del usuario en futuras versiones.

## 9. Autoría

**Proyecto:** Mathack — Videojuego matemático interactivo  
**Área académica:** Ingeniería en Sistemas Computacionales  
**Asignatura:** Graficación  
**Tecnologías principales:** HTML5, CSS3 y JavaScript  
**Tipo de aplicación:** Videojuego web bidimensional
