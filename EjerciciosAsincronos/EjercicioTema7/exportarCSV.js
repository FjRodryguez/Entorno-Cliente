//Creación del botón para hacer el CSV
const botonCSV = document.createElement('button');
botonCSV.addEventListener('click', () => crearCSV());
botonCSV.textContent = "Crear CSV";
document.body.appendChild(botonCSV);

//Función que crea el csv
function crearCSV() {
    // Obtener la tabla
    const table = document.querySelector("table");

    // Encabezados del CSV
    const headers = [...table.querySelectorAll("th")].map(th => th.textContent).join(",");

    //Convertir los datos de la tabla a formato csv
    const data = [...table.querySelectorAll("tbody tr")].map(tr =>
        [...tr.querySelectorAll("td")].map(td => td.textContent).join(",")
    ).join("\n");

    // Unir encabezados y datos
    const csvContent = `\uFEFF${headers}\n${data}`; // \uFEFF es para mantener el encoding UTF-8

    // Crear un Blob con el contenido CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Crear un enlace para la descarga
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "productos.csv";

    // Simular el clic para la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}