const tablero = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0]
]

let aciertos = 0;
const barcos = contarBarcos();

function contarBarcos(){
    cont = 0;
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if(tablero[i][j] === 1){
                cont++;
            }
        }
    }
    return cont;
}

function generarTabla() {
    let html = "<tr><th>X/Y</th>";
    for (let i = 0; i < tablero[0].length; i++) {
        html += `<th>${i}</th>`;
    }
    html += "</tr>";

    for (let i = 0; i < tablero.length; i++) {
        html += "<tr>"
        html += `<th>${i}</th>`;
        for (let j = 0; j < tablero[0].length; j++) {
            html += `<td id="${i}-${j}" onclick="disparar(${i}, ${j})"></td>`;
        }
        html += "</tr>";
    }

    document.getElementById("tabla").innerHTML = html;
}

function disparar(x, y) {
    const resultado = document.getElementById("resultado");
    const casilla = document.getElementById(`${x}-${y}`);
    
    if (tablero[x][y] === 1) {
        resultado.innerText = "Acertaste";
        casilla.style.backgroundColor = "red";
        aciertos++;
    } else {
        resultado.innerText = "Fallaste";
        casilla.style.backgroundColor = "blue";
    }
    if(aciertos === barcos){
        window.alert("Ganaste!");
        reiniciarTablero();
    }

    
}

function dispararCoordenadas(){
    const x = document.getElementById("coordenadaX").value;
    const y = document.getElementById("coordenadaY").value;
    disparar(x, y);
}

function reiniciarTablero(){
    const celdas = document.querySelectorAll("td");
    celdas.forEach(celda => {
        celda.style.backgroundColor = "white";
    });
}

generarTabla();