let intervalo = setInterval(calcularDiferencia, 1000);
const SEG = 1000,
    MIN = SEG * 60,
    HORA = MIN * 60,
    DIA = HORA * 24;

function calcularDiferencia() {
    const fechaEstreno = new Date("2024-12-25T00:00:00");
    let fechaActual = new Date();
    const resultado = document.getElementById("tiempoRestante");

    let tiempoRestante = (fechaEstreno.getTime() - fechaActual.getTime());

    if (tiempoRestante <= 0) {
        resultado.innerText = "La película ha sido estrenada!";
        clearInterval(intervalo);
        return;
    }
    const dias = parseInt(tiempoRestante / DIA).toString().padStart(2, "0"),
        horas = parseInt((tiempoRestante % DIA) / HORA).toString().padStart(2, "0"),
        minutos = parseInt((tiempoRestante % HORA) / MIN).toString().padStart(2, "0"),
        segundos = parseInt((tiempoRestante % MIN) / SEG).toString().padStart(2, "0");

    resultado.innerText = `${dias} Días, ${horas}:${minutos}:${segundos}`;
}