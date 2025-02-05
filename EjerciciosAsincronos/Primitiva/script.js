const contenedor = document.createElement("div");
contenedor.setAttribute("id", "container");
document.body.appendChild(contenedor);
const contenedorLista = document.createElement("div");

var contadores = new Array(7).fill(0);
let boleto = [];

function generarCheckBox() {
    const form = document.createElement("form");
    for (let i = 1; i <= 49; i++) {
        const label = document.createElement("label");
        label.textContent = i;

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", i);
        input.setAttribute("value", i);
        input.addEventListener("click", () => añadirNumeroBoleto(i))

        label.appendChild(input);
        form.appendChild(label);
    }
    contenedor.appendChild(form);

    const boleto = document.createElement("p");
    boleto.setAttribute("id", "boleto");
    boleto.textContent = "[]"
    contenedor.appendChild(boleto);

    const boton = document.createElement("button");
    boton.textContent = "Iniciar";
    boton.addEventListener("click", () => obtenerNumeros());
    contenedor.appendChild(boton);
}

function añadirNumeroBoleto(i) {
    const boletoParrafo = document.getElementById("boleto");
    if (boleto.includes(i)) {
        const indice = boleto.indexOf(i);
        boleto.splice(indice, 1);
    } else {
        boleto.push(i);
    }
    boletoParrafo.textContent = `[${boleto.join(", ")}]`;
}

function obtenerNumeros() {
    if (boleto.length === 6) {
        let intervalo = setInterval(mostrarAciertos, 100);
        compararNumeros(boleto)
            .then((intentos) => {
                const intentosExiste = document.getElementById("intentos");
                if (intentosExiste) {
                    intentosExiste.remove();
                }
                const p = document.createElement("p");
                p.setAttribute("id", "intentos");
                p.textContent = `Se ha completado en ${new Intl.NumberFormat('de-DE').format(intentos)} intentos`;
                contenedor.appendChild(p);
            })
            .catch((error) => {
                console.error("Algo ha fallado", error);
            })
            .finally(() => {
                clearInterval(intervalo);
                mostrarAciertos();
            });
    } else {
        window.alert("Solo se pueden escoger 6 números")
    }
}

async function compararNumeros(boleto) {
    return new Promise((resolve) => {
        let contadorIntentos = 0;
        contadores.fill(0);

        function iteracion() {
            if (contadores[6] === 1) {
                resolve(contadorIntentos);
                return;
            }

            let iteracionesPorBloque = 10000;
            for (let j = 0; j < iteracionesPorBloque; j++) {
                let arrayAleatorio = generarArrayAleatorio();
                let aciertos = 0;

                for (let i = 0; i < boleto.length; i++) {
                    if (arrayAleatorio.includes(boleto[i])) {
                        arrayAleatorio.splice(arrayAleatorio.indexOf(boleto[i]), 1);
                        aciertos++;
                    }
                }

                contadores[aciertos]++;
                contadorIntentos++;

                if (contadores[6] === 1) {
                    resolve(contadorIntentos);
                    return;
                }
            }

            setTimeout(iteracion, 0);
        }

        iteracion();
    });
}

function generarArrayCompleto() {
    return Array.from({ length: 49 }, (_, i) => i + 1);
}

function generarArrayAleatorio() {
    let arrayAleatorio = [];
    let arrayCompleto = generarArrayCompleto();

    for (let i = 0; i < 6; i++) {
        let indice = Math.floor(Math.random() * arrayCompleto.length);
        arrayAleatorio.push(arrayCompleto[indice]);
        arrayCompleto.splice(indice, 1);
    }
    return arrayAleatorio;
}

function mostrarAciertos() {
    let ulExistente = document.getElementById("aciertos-lista");
    if (ulExistente) {
        ulExistente.remove();
    }

    const ul = document.createElement("ul");
    ul.setAttribute("id", "aciertos-lista");

    for (let i = 0; i < contadores.length; i++) {
        const li = document.createElement("li");
        li.textContent = `Número de veces con ${i} aciertos: ${new Intl.NumberFormat('de-DE').format(contadores[i])}`;
        ul.appendChild(li);
    }

    contenedor.appendChild(ul);
}

generarCheckBox();
