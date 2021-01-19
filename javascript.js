function calcular() {
    console.log("SE PRESIONO");
    document.getElementById("Respuestas").style.display="block";
    var ExitosPoblacion = parseFloat(document.getElementById("Tratadas").value); //Semillas tratadas
    var FallosPoblacion = parseFloat(document.getElementById("NOtratadas").value); //Semillas NO tratadas
    var Poblacion = parseFloat(document.getElementById("Tratadas").value) + (parseFloat(document.getElementById("NOtratadas").value)); //Semillas tratadas + Semillas NO tratadas
    var Muestra = parseFloat(document.getElementById("ExitoPlantas").value); //Plantas que brotaron
    var ExitosMuestra;


    //PUNTO A: Probabilidad de que las cuatro plantas brotaran de semillas tratadas
    ExitosMuestra = 4;
    var ResultadoA = hipergeometrica(Poblacion, ExitosPoblacion, Muestra, ExitosMuestra);
    document.getElementById("ResultadoA").value = ResultadoA;
    generarPuntoA(ExitosPoblacion, Poblacion, Muestra, ExitosMuestra, 'PuntoAOutput');
    


    //PUNTO B: Probabilidad de que tres o menos plantas brotaran de semillas tratadas es de
    var CondicionB = 3;
    var ResultadoB = 0;
    for (j = 0; j <= CondicionB; j++) {
        ResultadoB = ResultadoB + hipergeometrica(Poblacion, ExitosPoblacion, Muestra, j);
        //console.log(ResultadoB);
    }
    document.getElementById("ResultadoB").value = ResultadoB;
    generarPuntoB(ExitosPoblacion, Poblacion, Muestra, ExitosMuestra, 'PuntoBOutput');

    //PUNTO C: Al menos una brotara de semillas no tratadas
    var CondicionC = 3;
    var ResultadoC = 0;
    for (l = 0; l <= CondicionC; l++) {
        ResultadoC = ResultadoC + hipergeometrica(Poblacion, ExitosPoblacion, Muestra, l);
        //console.log(ResultadoB);
    }
    document.getElementById("ResultadoC").value = ResultadoC;



    //VALIDACIONES

    if (FallosPoblacion < 0 || ExitosPoblacion < 0) {
        alert("No pueden existir valores negativos para las semillas tratadas. Por favor verifique los datos ingresados");
        document.getElementById("ResultadoA").value = "ERROR, VERIFIQUE PARÁMETROS";
        document.getElementById("ResultadoB").value = "ERROR, VERIFIQUE PARÁMETROS";
        document.getElementById("ResultadoC").value = "ERROR, VERIFIQUE PARÁMETROS";
    }

    if (Muestra > Poblacion) {
        alert("Las plantas que brotaron (Muestras exitosas) no pueden ser mayor a las semillas tratadas y NO tratadas (Población). Por favor verifique los datos ingresados");
        document.getElementById("ResultadoA").value = "ERROR, VERIFIQUE PARÁMETROS";
        document.getElementById("ResultadoB").value = "ERROR, VERIFIQUE PARÁMETROS";
        document.getElementById("ResultadoC").value = "ERROR, VERIFIQUE PARÁMETROS";
    }



}

function hipergeometrica(N, k, n, x) {
    var resultadohiper = (combinatoria(k, x) * combinatoria((N - k), (n - x))) / combinatoria(N, n);

    return resultadohiper;
}

function factorial(n) {
    var total = 1;
    for (i = 1; i <= n; i++) {
        total = total * i;
    }
    return total;

}

function combinatoria(n, x) {
    var resultado = factorial(n) / (factorial(x) * factorial(n - x));
    return resultado;
}


function generarPuntoA(k, N, n, x, OutputPunto) {
    var input = "P(X)={\\frac{\\begin{pmatrix}" +
        k + "\\" +
        "\\"+x+
        "\\end{pmatrix}\\cdot \\begin{pmatrix}" +
        N + "-" + k + "\\" +
        "\\" + n + "-" + x +
        "\\end{pmatrix}}{\\begin{pmatrix}" +
        N + "\\" +
        "\\" + n + "\\" +
        "end{pmatrix}}}";

    output = document.getElementById(OutputPunto);
    output.innerHTML = "";

    var options = MathJax.getMetricsFor(output);
    MathJax.tex2chtmlPromise(input, options).then(function (node) {

        output.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
    }).catch(function (err) {
        
        output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    }).then(function () {
        

    });
}

function generarPuntoB(k, N, n, x, OutputPunto) {
    var input2 = "P(X\\leq 3)="+" \\sum_{x=0}^{3}" +
        "{\\frac{\\begin{pmatrix}" +
        k + "\\" +
        "\\"+x+
        "\\end{pmatrix}\\cdot \\begin{pmatrix}" +
        N + "-" + k + "\\" +
        "\\" + n + "-" + x +
        "\\end{pmatrix}}{\\begin{pmatrix}" +
        N + "\\" +
        "\\" + n + "\\" +
        "end{pmatrix}}}";

    output2 = document.getElementById(OutputPunto);
    output2.innerHTML = "";

    var options = MathJax.getMetricsFor(output);
    MathJax.tex2chtmlPromise(input2, options).then(function (node) {

        output2.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
    }).catch(function (err) {
        
        output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    }).then(function () {
        

    });
}