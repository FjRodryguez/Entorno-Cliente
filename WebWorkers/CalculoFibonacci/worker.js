//Cálculo recursivo de Fibonacci
function fibonacci(n){
    if(n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

onmessage = function(event){
    const numero = event.data;
    const resultado = fibonacci(numero);
    postMessage(resultado);
}