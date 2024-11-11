let saltos = 10;
        let aciertos = 0;
        let tiempo = 2000;
        let tamañoRana = 500;
        let tamañoCaja = 50;
        let tamañoEncabezado = document.getElementById("contenedor").style.height;
        let tablero = document.getElementById("tablero");
        let rana = document.getElementById("rana");
        let caja = document.getElementById("caja");
        let saltosRestantes = document.getElementById("saltos");
        saltosRestantes.innerText = saltos;
        let tableroX = tablero.style.width = window.innerWidth;
        let tableroY = tablero.style.height = window.innerHeight - tamañoEncabezado;

        mostrarRana();
        let intervalo = setInterval(mostrarRana, tiempo);
        setTimeout(mostrarCaja, 3000);
        setTimeout
        function mostrarRana() {
            if (saltos === 0) {
                clearInterval(intervalo);
                rana.style.width = "0px"
                rana.style.height = "0px"
            } else {
                rana.style.width = tamañoRana + "px";
                rana.style.height = tamañoRana + "px";
                rana.style.left = `${Math.random() * (tableroX - tamañoRana)}px`;
                rana.style.top = `${Math.random() * (tableroY - tamañoRana)}px`;
                saltos--;
                saltosRestantes.innerText = saltos;
            }
        }

        function mostrarCaja() {
            caja.style.width = tamañoCaja + "px";
            caja.style.height = tamañoCaja + "px";
            caja.style.left = `${Math.random() * (tableroX - tamañoCaja)}px`;
            caja.style.top = `${Math.random() * (tableroY - tamañoCaja)}px`;
            console.log(caja.style.top);
        }

        function aumentarMarcador() {
            let marcador = document.getElementById("marcador");
            intervalo = nuevoIntervalo();
            tamañoRana -= 50;
            aciertos++;
            marcador.innerText = "Aciertos: " + aciertos;
        }

        function abrirCaja() {

        }

        function nuevoIntervalo() {
            clearInterval(intervalo);
            tiempo -= 200;
            return setInterval(mostrarRana, tiempo)
        }