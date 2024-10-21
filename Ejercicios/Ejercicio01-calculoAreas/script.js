function calcularAreaCuadrado(lado) {
    let area = lado * lado;
    console.log(lado);
    return area;
}
function calcularAreaCirculo(radio) {
    let area = Math.PI * radio ** 2;
    return area;
}
function calcularAreaTriangulo(base, altura) {
    let area = (base * altura) / 2;
    return area;
}

function calcularAreas() {
    let lado = document.getElementById("ladoCuadrado").value;
    let radio = document.getElementById("radioCirculo").value;
    let base = document.getElementById("baseTriangulo").value;
    let altura = document.getElementById("alturaTriangulo").value;

    let areaCuadrado = calcularAreaCuadrado(lado);
    let areaCirculo = calcularAreaCirculo(radio);
    let areaTriangulo = calcularAreaTriangulo(base, altura);

    document.getElementById("areaCuadrado").innerHTML = "Area: " + areaCuadrado;
    document.getElementById("areaCirculo").innerHTML = "Area: " + areaCirculo;
    document.getElementById("areaTriangulo").innerHTML = "Area: " + areaTriangulo;
}