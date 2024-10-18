var alumnos = [];
var asignaturas = [];
var arrayNotas = [];
valorAleatorio = () => (Math.random() * 10).toFixed(2);
hacerMedia = (suma, cont) => (suma / cont).toFixed(2);
parOImpar = (numero) => (numero % 2 == 0) ? "par" : "impar";

function color(nota) {
    if (nota < 3) {
        return "rojo";
    } else if (nota < 5) {
        return "amarillo";
    } else {
        return "negro";
    }
}

function procesarLista() {
    alumnos = document.getElementById("alumnos").value.split(",").map(item => item.trim());
    asignaturas = document.getElementById("asignaturas").value.split(",").map(item => item.trim());
    arrayNotas = new Array(alumnos.length);

    for (let i = 0; i < arrayNotas.length; i++) {
        arrayNotas[i] = new Array(asignaturas.length);
        for (let j = 0; j < asignaturas.length; j++) {
            arrayNotas[i][j] = valorAleatorio();
        }
    }

    window.alert("Lista procesada");
}

function mostrarNotas() {
    let tabla = document.getElementById("tablaNotas");
    tabla.innerHTML = "";
    let i = 0;
    let html = "";
    let mediaTotal = 0;
    html += "<tr id='cabecera'><th>Alumnos</th>";
    asignaturas.forEach(asignatura => {
        html += "<th>" + asignatura + "</th>";
    });
    html += "<th>Media</th>"
    html += "<tr/>";
    alumnos.forEach(alumno => {
        let acumulador = 0;
        html += "<tr class="+parOImpar(i)+"><th>" + alumno + "</th>";
        arrayNotas[i].forEach(nota => {
            html += "<td class=" + color(nota) + ">" + nota + "</td>";
            acumulador += parseFloat(nota);
        });
        html += "<td class=" + color(hacerMedia(acumulador, asignaturas.length)) + ">" + hacerMedia(acumulador, asignaturas.length) + "</td>";
        i++;
        html += "</tr>";
    });
    html += "<tr class="+parOImpar(i)+"><th>Media</th>";
    let j = 0;
    asignaturas.forEach(asignatura => {
        let acumulador = 0;
        arrayNotas.forEach(notas => {
            acumulador += parseFloat(notas[j]);
        });
        mediaTotal += parseFloat(hacerMedia(acumulador, alumnos.length));
        console.log(mediaTotal);
        html += "<td class=" + color(hacerMedia(acumulador, alumnos.length)) + ">" + hacerMedia(acumulador, alumnos.length) + "</td>";
        j++;
    });
    html += "<td class=" + color(hacerMedia(mediaTotal, asignaturas.length)) + ">" + hacerMedia(mediaTotal, asignaturas.length) + "</td>";
    html += "</tr>";
    tabla.innerHTML += html;
}