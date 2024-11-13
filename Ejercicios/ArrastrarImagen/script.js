function crearContenedor() {
    let contenedor = document.getElementById("contenedor");
    contenedor.style.width = `${window.innerWidth - 20}px`;
    contenedor.style.height = `${window.innerHeight - 20}px`;
}

const contenedorCirculo = document.getElementById("circulo-container");
const contenedorTriangulo = document.getElementById("triangulo-container");
const contenedorRectangulo = document.getElementById("rectangulo-container");

// Variables para almacenar el desplazamiento inicial
let desplazamientoX = 0;
let desplazamientoY = 0;

// Función para iniciar el arrastre
function iniciarArrastre(evento) {
    if (evento.button !== 0) return; // Solo iniciar si el botón izquierdo está presionado

    evento.preventDefault(); // Prevenir el arrastre predeterminado del navegador

    const imagen = evento.target;
    imagen.style.cursor = "grabbing";

    // Obtener la posición inicial de la imagen en relación al punto de clic
    desplazamientoX = evento.pageX - (parseInt(imagen.style.left) || 0);
    desplazamientoY = evento.pageY - (parseInt(imagen.style.top) || 0);

    // Asignar los eventos de movimiento y de soltar el mouse
    imagen.onmousemove = moverImagen;
    imagen.onmouseup = detenerArrastre;

    // Mover la imagen a la posición inicial del clic
    moverImagen(evento);
    console.log("Desplazamiento: " + desplazamientoX);
    console.log("Contendor circulo: " + contenedorCirculo.style.left + "...." + contenedorCirculo);
    if (desplazamientoX === parseInt(contenedorCirculo.style.left)) {
        imagen.style.visibility = "hidden";
    }
}

// Función para mover la imagen
function moverImagen(evento) {
    const imagen = evento.target;

    // Si el botón izquierdo no está presionado, detener el arrastre
    if (evento.buttons !== 1) {
        detenerArrastre(evento);
        return;
    }

    let imagenX = 0;
    let imagenY = 0;

    // Calcular y asignar la nueva posición
    imagen.style.left = `${evento.pageX - desplazamientoX}px`;
    imagen.style.top = `${evento.pageY - desplazamientoY}px`;
}

// Función para detener el arrastre
function detenerArrastre(evento) {
    const imagen = evento.target;
    imagen.style.cursor = "grab";

    // Verificar si la imagen está sobre uno de los contenedores
    if (verificarColision(imagen, contenedorCirculo) && imagen.id === "circulo") {
        imagen.style.display = "none";
    } else if (verificarColision(imagen, contenedorTriangulo) && imagen.id === "triangulo") {
        imagen.style.display = "none";
    } else if (verificarColision(imagen, contenedorRectangulo) && imagen.id === "rectangulo") {
        imagen.style.display = "none";
    }

    // Quitar los eventos de movimiento y de soltar el mouse
    imagen.onmousemove = null;
    imagen.onmouseup = null;
}

// Función para verificar colisión entre la imagen y el contenedor
function verificarColision(imagen, contenedor) {
    const rectImagen = imagen.getBoundingClientRect();
    const rectContenedor = contenedor.getBoundingClientRect();

    return (
        rectImagen.left < rectContenedor.right &&
        rectImagen.right > rectContenedor.left &&
        rectImagen.top < rectContenedor.bottom &&
        rectImagen.bottom > rectContenedor.top
    );
}