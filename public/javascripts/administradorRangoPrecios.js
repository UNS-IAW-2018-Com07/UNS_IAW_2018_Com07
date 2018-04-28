function actualizarPreciosRango(operacion) {
    var minimo;
    var maximo;
    var medio;
    $.get("datos/rangoPrecios.json", function (precios) {
        if (operacion === "Venta") {
            minimo = precios.minimoVenta;
            maximo = precios.maximoVenta;
        } else {
            if (operacion === "Alquiler") {
                minimo = precios.minimoAlquiler;
                maximo = precios.maximoAlquiler;
            } else {
                minimo = Math.min(precios.minimoAlquiler,precios.minimoVenta);
                maximo = Math.max(precios.maximoAlquiler,precios.maximoVenta);
            }
        }
        medio = (maximo - minimo) / 2 + minimo;
        auxActualizarPreciosRango(minimo, maximo, medio);
    });

    function auxActualizarPreciosRango(minimo, maximo, medio) {
        document.getElementById("miRango").min = minimo;
        document.getElementById("miRango").max = maximo;
        document.getElementById("miRango").value = medio;
        document.getElementById("minimo").innerHTML = minimo;
        document.getElementById("maximo").innerHTML = maximo;
        document.getElementById("idTxt").innerHTML = medio;
    }

}