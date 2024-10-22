function validaFechaDDMMAAAA(fecha) {
    var dtCh = "/";
    var minYear = 1900;
    var maxYear = 2100;
    function isInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        return true;
    }
    function stripCharsInBag(s, bag) {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }
    function daysInFebruary(year) {
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    }
    function DaysArray(n) {
        for (var i = 1; i <= n; i++) {
            this[i] = 31
            if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
            if (i == 2) { this[i] = 29 }
        }
        return this
    }
    function isDate() {
        var daysInMonth = DaysArray(12)
        var pos1 = fecha.indexOf(dtCh)
        var pos2 = fecha.indexOf(dtCh, pos1 + 1)
        var strDay = fecha.substring(0, pos1)
        var strMonth = fecha.substring(pos1 + 1, pos2)
        var strYear = fecha.substring(pos2 + 1)
        strYr = strYear
        if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
        if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
        for (var i = 1; i <= 3; i++) {
            if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
        }
        month = parseInt(strMonth)
        day = parseInt(strDay)
        year = parseInt(strYr)
        if (pos1 == -1 || pos2 == -1) {
            return false
        }
        if (strMonth.length < 1 || month < 1 || month > 12) {
            return false
        }
        if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
            return false
        }
        if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
            return false
        }
        if (fecha.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(fecha, dtCh)) == false) {
            return false
        }
        return true
    }
    if (isDate(fecha)) {
        return true;
    } else {
        return false;
    }
}

calcularDias = (arrayFecha) => parseInt(arrayFecha[0]) + (parseInt(arrayFecha[1]) * 30.4167) + ((parseInt(arrayFecha[2] - 1970) * 365));

function calcularFecha(dias){
    console.log(dias);
    let fecha = [];
    fecha[2] = parseInt(dias/365);
    fecha[1] = parseInt((dias%365) / 30.4167);
    fecha[0] = parseInt((dias%365) % 30.4167);
    return fecha;
}

function procesarFechas(){
    const inputFecha1 = document.getElementById("fecha1").value;
    const inputFecha2 = document.getElementById("fecha2").value;
    let resultado = document.getElementById("resultado");

    if(validaFechaDDMMAAAA(inputFecha1) && validaFechaDDMMAAAA(inputFecha2)){
        const arrayFecha1 = inputFecha1.split("/");
        const arrayFecha2 = inputFecha2.split("/");
        let diasFecha1 = calcularDias(arrayFecha1);
        let diasFecha2 = calcularDias(arrayFecha2);
        if(diasFecha1 < diasFecha2){
            let diferencia = calcularFecha(diasFecha2-diasFecha1);
            resultado.innerText = `Hay ${diferencia[2]} años, ${diferencia[1]} meses y ${diferencia[0]} días de diferencia`;
        }else{
            resultado.innerText = "La fecha 2 debe ser superior a la fecha 1"
        }
    }else{
        resultado.innerText = "Formato de fechas no válido";
    }
}
