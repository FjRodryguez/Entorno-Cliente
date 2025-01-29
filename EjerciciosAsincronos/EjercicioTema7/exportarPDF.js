//Creación del botón para hacer el PDF
const botonPDF = document.createElement('button');
botonPDF.addEventListener('click', () => crearPDF());
botonPDF.textContent = "Crear PDF";
document.body.appendChild(botonPDF);

//Función para crear PDF
function crearPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Lista de Productos", 14, 10);

    // Obtener la tabla
    const table = document.querySelector("table");

    // Extraer encabezados
    const headers = [...table.querySelectorAll("th")].map(th => th.textContent);

    // Extraer filas de la tabla
    const data = [...table.querySelectorAll("tbody tr")].map(tr =>
        [...tr.querySelectorAll("td")].map(td => td.textContent)
    );

    // Generar la tabla en el PDF
    doc.autoTable({
        head: [headers],
        body: data,
        startY: 20,
        theme: "",
    });

    // Descargar el PDF
    doc.save("productos.pdf");
}