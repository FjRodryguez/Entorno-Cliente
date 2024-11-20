let personas = []; // Inicializamos el array personas
const datosPedidos = ['Nombre', 'Apellidos', 'Telefono']; // Array para crear el formulario
const body = document.body;

// Crear contendor principal
const contenedor = document.createElement("div");
contenedor.setAttribute("class", "contenedor");
body.appendChild(contenedor);

// Contendor para el formulario
const contenedorForm = document.createElement("div");
contenedorForm.setAttribute("class", "contenedor-form");
contenedor.appendChild(contenedorForm);

// Crear el form
const form = document.createElement("form");
form.setAttribute("action", "");
contenedorForm.appendChild(form);

// Crear el fieldset
const fieldset = document.createElement("fieldset");
const legend = document.createElement("legend");
legend.textContent = "Datos del Contacto";
fieldset.appendChild(legend);
form.appendChild(fieldset);

//Crea un label y un input por cada elemento del array datosPedidos
datosPedidos.forEach(dato => {
    const contenedorInput = document.createElement("div");
    contenedorInput.setAttribute("class", "contenedor-input");
    const label = document.createElement("label");
    label.textContent = dato;
    label.setAttribute("for", dato);
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", dato.toLowerCase())
    contenedorInput.appendChild(label);
    contenedorInput.appendChild(input);
    fieldset.appendChild(contenedorInput);
});

// Crear un div para los botones del form
const divBotones = document.createElement("div");
divBotones.setAttribute("id", "divBotones");
fieldset.appendChild(divBotones);

// Botón insertar
const btnInsertar = document.createElement("input");
btnInsertar.setAttribute("type", "button")
btnInsertar.setAttribute("value", "Insertar");
btnInsertar.setAttribute("class", "boton");
divBotones.appendChild(btnInsertar);

// Botón borrar
const btnBorrar = document.createElement("input");
btnBorrar.setAttribute("type", "button")
btnBorrar.setAttribute("value", "Borrar");
btnBorrar.setAttribute("class", "boton");
divBotones.appendChild(btnBorrar);

// Contenedor para procesar
const contenedorProcesar = document.createElement("div");
contenedor.appendChild(contenedorProcesar);

// Botón procesar
const btnProcesar = document.createElement("button");
btnProcesar.setAttribute("class", "boton");
btnProcesar.textContent = "Procesar";
contenedorProcesar.appendChild(btnProcesar);

// Evento para registrar persona
btnInsertar.addEventListener("click", function () {
    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let telefono = document.getElementById("telefono").value.trim();

    datosPersona = [nombre, apellidos, telefono];
    personas.push(datosPersona);
    window.alert("Persona insertada correctamente");
    borrar();   // Borra los inputs
});

//Funcion para borrar
function borrar() {
    let nombre = document.getElementById("nombre").value = "";
    let apellidos = document.getElementById("apellidos").value = "";
    let telefono = document.getElementById("telefono").value = "";
}

// Evento para borrar
btnBorrar.addEventListener("click", borrar);

// Crear contendor de la tabla
const contenedorTabla = document.createElement("div");

// Evento para crear tabla
btnProcesar.addEventListener("click", function () {
    if (personas.length > 0) {
        contenedorTabla.innerHTML = "";
        contenedor.appendChild(contenedorTabla);
        const table = document.createElement("table");
        const tr = document.createElement("tr");

        datosPedidos.forEach(dato => {
            const th = document.createElement("th");
            th.textContent = dato;
            tr.appendChild(th);
        });
        table.appendChild(tr);

        personas.forEach(persona => {
            const tr = document.createElement("tr");
            persona.forEach(dato => {
                const td = document.createElement("td");
                td.textContent = dato;
                tr.appendChild(td);
                table.appendChild(tr);
            });
        });

        contenedorTabla.appendChild(table);
    } else {
        window.alert("No hay datos");
    }
});