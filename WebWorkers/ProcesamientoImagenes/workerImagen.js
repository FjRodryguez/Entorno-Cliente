// Simulamos un procesamiento de imagen (por ejemplo, aplicando un filtro simple)
onmessage = function (event) {
    const imagenBase64 = event.data;
    // En un caso real, podríamos convertir la imagen a un ArrayBuffer,
    // aplicar filtros pixel a pixel y volver a convertir a Base64, etc.
    // Por simplicidad, simulamos un tiempo de procesamiento y enviamos logs intermedios
    postMessage({ tipo: 'log', mensaje: 'Iniciando procesamiento de imagen...' });
    // Simulamos un retardo (por ejemplo, 2 segundos)
    setTimeout(() => {
        postMessage({ tipo: 'log', mensaje: 'Procesamiento intermedio...' });
    }, 1000);
    setTimeout(() => {
        // Al finalizar, devolvemos el resultado (aquí, por ejemplo, podríamos devolver la imagen procesada)
        postMessage({ tipo: 'resultado', data: imagenBase64 });
    }, 3000);
};