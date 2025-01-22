const body = document.body;

//Función asíncrona para obtener los datos
function procesoAsincrono(numPerPage, pagina, callback) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            callback(numPerPage, pagina, data);
        })
        .catch(error => {
            console.error("Error al descargar:", error);
        });
}

//Creación de la tabla
function manejarResultado(numPerPage, pagina, data) {
    //Obtener propiedades para ponerlas como th
    const propiedades = Object.keys(data[0]);
    const table = document.createElement("table");
    table.setAttribute("id", "tabla");
    const cabecera = document.createElement("tr");
    propiedades.forEach(propiedad => {
        const th = document.createElement("th");
        th.textContent = propiedad;
        cabecera.appendChild(th);
    });
    table.appendChild(cabecera);

    //Si el número de elementos por página son 0 se muestran todos
    if (numPerPage <= 0) {
        numPerPage = data.length;
    }

    const inicio = (pagina - 1) * numPerPage;
    const fin = inicio + numPerPage;
    //Creación de las filas según el número de elementos
    data.slice(inicio, fin).forEach(objeto => {
        const tr = document.createElement("tr");
        propiedades.forEach(propiedad => {
            const td = document.createElement("td");
            td.textContent = objeto[propiedad];
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    body.appendChild(table);
    paginacion(numPerPage, data, pagina);
}

//Creación de los botones para cambiar de página
function paginacion(numPerPage, data, paginaActual) {
    const paginas = Math.ceil(data.length / numPerPage);
    const contendor = document.createElement("div");
    contendor.setAttribute("id", "paginas-container");

    //Botón para ir directamente a la página 1
    const paginaInicial = document.createElement("button");
    paginaInicial.textContent = "<<"
    paginaInicial.addEventListener("click", () => mostrarDatosPagina(numPerPage, 1));
    contendor.appendChild(paginaInicial);

    //Botón para ir a la página anterior
    const paginaAnterior = document.createElement("button");
    paginaAnterior.textContent = "<"
    paginaAnterior.addEventListener("click", () => mostrarDatosPagina(numPerPage, paginaActual - 1));
    contendor.appendChild(paginaAnterior);

    //Botones para ir a la página correspondiente
    for (let i = 1; i <= paginas; i++) {
        const pagina = document.createElement("button");
        pagina.textContent = i;
        pagina.addEventListener("click", () => mostrarDatosPagina(numPerPage, i, paginas));
        contendor.appendChild(pagina);
    }

    //Botón para ir a la página siguiente
    const paginaSiguiente = document.createElement("button");
    paginaSiguiente.textContent = ">"
    paginaSiguiente.addEventListener("click", () => mostrarDatosPagina(numPerPage, paginaActual + 1, paginas));
    contendor.appendChild(paginaSiguiente);

    //Botón pra ir directamente a la página final
    const paginaFinal = document.createElement("button");
    paginaFinal.textContent = ">>"
    paginaFinal.addEventListener("click", () => mostrarDatosPagina(numPerPage, paginas, paginas));
    contendor.appendChild(paginaFinal);
    body.appendChild(contendor);
}

function mostrarDatosPagina(numPerPage, pagina, paginas) {
    eliminarTabla();
    //Si nos mandan un página menor a la 1 se mantiene en la primera
    if (pagina < 1) {
        pagina = 1;
    }
    //Si la página es mayor al número total se manda a la última
    if (pagina > paginas) {
        pagina = paginas;
    }
    procesoAsincrono(numPerPage, pagina, manejarResultado)
}

//Elimina la tabla actual si esta existe
function eliminarTabla() {
    const tabla = document.getElementById("tabla");
    const paginas = document.getElementById("paginas-container");
    if (tabla) body.removeChild(tabla);
    if (paginas) body.removeChild(paginas);
}

//Evento para manejar el cambio de elementos por página
const select = document.getElementById("paginacion");
select.addEventListener("change", () => {
    let valor = select.value;
    eliminarTabla();

    valor = parseInt(valor);
    procesoAsincrono(valor, 1, manejarResultado);
});

procesoAsincrono(select.value, 1, manejarResultado);