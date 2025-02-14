//Escuchar el evento onmessage para recibir mensajes del hilo principal
onmessage = function(event){
    console.log("Mensaje recibido del hilo principal:", event.data);

    //Responder al hilo principal
    const respuesta = `Worker ha recibido tu mensaje: "${event.data}"`;
    postMessage(respuesta);
}
