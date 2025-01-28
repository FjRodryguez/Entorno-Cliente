const body = document.body;
const contenedor = document.createElement('div');
contenedor.setAttribute('id', 'contenedor-provincias');

//Creación del objeto XMLHttpRequest
const xhr = new XMLHttpRequest();

xhr.open('GET', 'ccaa.xml', true);

//Que hacer una vez estén los datos
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const datos = xhr.responseXML;
        if (datos) {
            cargarRadioButtons(datos);
        } else {
            console.log("El archivo no es puede interpretar como XML");
        }
    }
}
//Enviar la petición
xhr.send();

//Carga los radiobuttons según el XML devuelto
function cargarRadioButtons(datos) {
    const form = document.createElement('form');
    //Seleccionamos todas las etiquetas comunidad_autonoma
    const comunidades = datos.getElementsByTagName('comunidad_autonoma');
    for (let i = 0; i < comunidades.length; i++) {
        const codigo = comunidades[i].getElementsByTagName('codigo')[0].textContent;// Código de la comunidad con la posición [i]
        const nombre = comunidades[i].getElementsByTagName('nombre')[0].textContent;// Nombre de la comunidad con la posición [i]

        //Creamos el radioButton
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'comunidades');
        input.setAttribute('value', codigo);
        //Si es la primera, que aparezca como seleccionada
        if (i == 0) {
            input.checked = true;
            codigoPrimera = codigo;//Guardamos el código de la primera
        }
        input.textContent = nombre;
        //Asignamos el evento click para cargar las provincias
        input.addEventListener('click', () => cargarProvincias(codigo));
        form.appendChild(input);

        //Creación del label
        const label = document.createElement('label');
        label.setAttribute('for', `comunidad-${codigo}`);
        label.textContent = nombre;
        form.appendChild(label);

        //Si existe el codigo de la primera comunidad que se carguen sus provincias, ya que esta aparecerá seleccionada
        if (codigoPrimera) {
            cargarProvincias(codigoPrimera);
        }
    }
    body.appendChild(form);
}

//Función que carga las provincias según la comunidad seleccionada
function cargarProvincias(codigo) {

    //Petición asíncrona con fetch
    fetch('provincias.json')
        .then(response => response.json())
        .then(data => {
            contenedor.innerHTML = "";//Limpiar el contenedor
            //Creación de la lista
            const lista = document.createElement('ul');
            data.forEach(element => {
                //Si el código de la comunidad enviado es el mismo que el de alguna provincia esta aparecerá en la lista
                if (codigo == element.codigo) {
                    const provincia = document.createElement('li');
                    provincia.textContent = element.nombre;
                    lista.appendChild(provincia);
                }
            });
            contenedor.appendChild(lista);
            body.appendChild(contenedor);
        })
        .catch(error => {
            console.log("Error al cargar los datos", error)
        })
}