const modelos = [
    ["Hanley", 5],
    ["Honda", 10],
    ["Yamaha", 15]
];
//Carga la lista de modelos en base al array con el mismo nombre
function mostrarModelos() {
    let html = "";
    html += "<div>";
    for (let i = 0; i < modelos.length; i++) {
        html += "<div>";
        html += `<input type="radio" name="modelo" value="${i}">`;
        html += `<label for="modelo${i}">${modelos[i][0]}</label>`;
        html += "</div>";
    }
    html += "</div>";
    html += "<div>";
    html += '<input type="button" value="Calcular precio" onclick="calcularPrecio()">';
    html += "</div>";
    return html;
}
const fieldsetModelos = document.getElementById("modelos").innerHTML += mostrarModelos();

//Cambia el día mínimo de entrega al mismo que el de recogida
function cambiarMinEntrega() {
    entrega.value = recogida.value;
    entrega.min = recogida.value;
}

//Obtiene la fecha actual
function obtenerFechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anho = fecha.getFullYear();

    return `${anho}-${mes}-${dia}`;
}

//A cada input le pone la fecha de hoy y a su atributo min también
const recogida = document.getElementById("recogida");
const entrega = document.getElementById("entrega");
recogida.value = obtenerFechaActual();
recogida.min = obtenerFechaActual();
entrega.value = obtenerFechaActual();
entrega.min = obtenerFechaActual();

//Cambiar la fecha de entrega para que tenga el min de la fecha de recogida
function cambiarMinEntrega() {
    entrega.value = recogida.value;
    entrega.min = recogida.value;
}

//Calcular el precio en función de los días de alquiler
function calcularPrecio() {
    const resultado = document.getElementById("resultado");
    let modeloInput = document.querySelector('input[name="modelo"]:checked').value;
    let modelo = modelos[modeloInput];
    let recogidaDate = new Date(recogida.value);
    let entregaDate = new Date(entrega.value);
    if (recogidaDate.getDate() !== entregaDate.getDate()) {
        let diferenciaFecha = (entregaDate - recogidaDate) / 1000 / 3600 / 24;
        resultado.innerText = `Precio: ${diferenciaFecha * modelo[1]} €`;
    } else {
        window.alert("El alquiler tiene que ser de 1 día como mínimo");
    }
}