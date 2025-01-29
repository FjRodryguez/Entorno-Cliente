const contenedor = document.getElementById('container');
const arrayCabeceras = ['ID', 'Nombre', 'Categoria'];
let productos = [];

//Obtener los productos de productos.json
async function obtenerProductos() {
    try {
        const response = await fetch('productos.json');

        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }

        const datos = await response.json(); // Parsear json
        productos = datos; // Guardar los productos en la variable global

        //Si todo ha ido bien, obtener las categorias de categorias.xml
        obtenerCategorias();
    } catch (error) {
        console.log('Ha ocurrido un error', error);
    }
}

async function obtenerCategorias() {
    try {
        const response = await fetch('categorias.xml');

        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }

        const xmlText = await response.text(); // Obtener el contenido como texto
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "application/xml"); // Parsear como XML

        //Una vez obtenido el documento, seleccionamos todas las etiquetas con el nombre categoria
        const categorias = doc.getElementsByTagName('categoria');

        //Combinamos los datos, para que se sustituya el valor de categoriaId por el nombre de la categoria
        combinarDatos(productos, categorias);
    } catch (error) {
        console.log('Ha ocurrido un error', error);
    }
}

function combinarDatos(productos, categorias) {
    productos.forEach(producto => {
        //Iteración sobre cada elemento de categorias
        for (const categoria of categorias) {
            //Si la id de categoria es igual al del producto, 
            //se cambia su valor por el nombre de la categoria correspondiente
            if (categoria.getAttribute('id') == producto.categoriaId) {
                producto.categoriaId = categoria.getElementsByTagName('nombre')[0].textContent;
            }
        }
    });
    renderirzarTabla();
}

//Creación de la tabla
function renderirzarTabla(orden = 'id') {
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const cabeceras = document.createElement('tr');
    const propiedades = Object.keys(productos[0]);

    //Creación de las cabeceras con el arrayCabeceras
    for (let i = 0; i < arrayCabeceras.length; i++) {
        const th = document.createElement('th');
        th.textContent = arrayCabeceras[i];
        th.setAttribute('id', propiedades[i]);
        if (orden == th.id) {
            th.style.color = "blue";
            th.style.textDecoration = "underline";
        }
        //Se añade el evento click para ordenar según la cabecera seleccionada
        th.addEventListener('click', () => ordenacion(th.id))
        cabeceras.appendChild(th);
    }
    tableHead.appendChild(cabeceras);
    table.appendChild(tableHead);

    const tableBody = document.createElement('tbody');
    tableBody.setAttribute('id', 'tbody');
    //Creación de las filas para los productos
    productos.forEach(producto => {
        const tr = document.createElement('tr');
        propiedades.forEach(propiedad => {
            const td = document.createElement('td');
            td.textContent = producto[propiedad];
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
    table.append(tableBody);
    contenedor.appendChild(table);
}

//Función para ordenar la tabla
function ordenacion(orden) {
    productos.sort((a, b) => {
        let valorA = a[orden];
        let valorB = b[orden];

        // Convertir a número si es el ID
        if (orden === 'id') {
            valorA = parseInt(valorA);
            valorB = parseInt(valorB);
        } else {
            valorA = valorA.toString().toLowerCase();
            valorB = valorB.toString().toLowerCase();
        }

        return valorA > valorB ? 1 : (valorA < valorB ? -1 : 0);
    });

    // Limpiar la tabla antes de renderizarla nuevamente
    contenedor.innerHTML = '';
    renderirzarTabla(orden);
}

obtenerProductos();
