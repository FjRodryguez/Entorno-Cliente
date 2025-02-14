onmessage = function (event) {
    postMessage("Worker 2 recibió: " + event.data);
    
    // Modificamos el mensaje final
    const mensajeFinal = event.data + " -> Procesado por Worker 2";

    // Enviamos la respuesta de vuelta al Worker 1
    postMessage(mensajeFinal);
};
