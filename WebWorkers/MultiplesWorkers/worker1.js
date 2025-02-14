// Creamos el segundo worker dentro del primer worker
const worker2 = new Worker("worker2.js");

onmessage = function (event) {
    postMessage("Worker 1 recibió: " + event.data);
    
    // Modificamos el mensaje antes de pasarlo al Worker 2
    const mensajeModificado = event.data + " -> Procesado por Worker 1";

    // Enviamos el mensaje modificado al Worker 2
    worker2.postMessage(mensajeModificado);
};

// Recibimos la respuesta del Worker 2 y la enviamos de vuelta al Main Thread
worker2.onmessage = function (event) {
    postMessage("Worker 1 recibió de Worker 2: " + event.data);
};
