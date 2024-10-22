setInterval(mostrarHora, 1000);

        function mostrarHora(){
            let hora = new Date();
            let horas = hora.getHours();
            let minutos = hora.getMinutes();
            let segundos = hora.getSeconds();

            if(horas < 10){
                horas = "0"  + horas;
            }
            if(minutos < 10){
                minutos = "0" + minutos;
            }
            if(segundos < 10){
                segundos = "0" + segundos;
            }
            document.getElementById("horaActual").innerText = `${horas}:${minutos}:${segundos}`;
        }

        function hola(){
            document.getElementById("hola").innerText += "Hola";
        }